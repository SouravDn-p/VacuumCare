"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircleMore, Paperclip, Send } from "lucide-react";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  useGetConversationMessagesQuery,
  useGetConversationsQuery,
  useMarkConversationReadMutation,
  useSendConversationMessageMutation,
} from "@/redux/features/api/customer/service/customerServiceApi";

function isVideo(url: string, mimeType?: string) {
  return Boolean(mimeType?.startsWith("video/") || /\.(mp4|mov|webm)$/i.test(url));
}

function displayName(first?: string, last?: string, fallback = "Customer") {
  const name = `${first ?? ""} ${last ?? ""}`.trim();
  return name || fallback;
}

export default function AdminMessagesClient() {
  const fileRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const { data: conversations = [] } = useGetConversationsQuery(undefined, {
    pollingInterval: 4000,
  });
  const supportThreads = useMemo(
    () => conversations.filter((item) => !item.requestId),
    [conversations],
  );
  const activeId = selectedId || supportThreads[0]?.id || null;
  const active = supportThreads.find((item) => item.id === activeId);

  const { data: messages = [] } = useGetConversationMessagesQuery(activeId ?? "", {
    skip: !activeId,
    pollingInterval: 2500,
  });
  const [sendMessage, { isLoading: sending }] = useSendConversationMessageMutation();
  const [markRead] = useMarkConversationReadMutation();

  useEffect(() => {
    if (activeId) void markRead(activeId);
  }, [activeId, markRead]);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, activeId]);

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();
    if (!activeId) return;
    const text = draft.trim();
    if (!text && !files.length) return;
    try {
      await sendMessage({
        conversationId: activeId,
        data: {
          body: text,
          images: files.filter((file) => file.type.startsWith("image/")),
          videos: files.filter((file) => file.type.startsWith("video/")),
        },
      }).unwrap();
      setDraft("");
      setFiles([]);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Message could not be sent"));
    }
  };

  return (
    <div className="msg-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Messages</h1>
        <p className="admin-page-subtitle">Live chat with customers who contacted support</p>
      </div>
      <div className="msg-shell">
        <aside className="msg-list" aria-label="Customer conversations">
          {supportThreads.length === 0 ? (
            <p className="msg-empty">No customer messages yet.</p>
          ) : (
            supportThreads.map((thread) => {
              const name = displayName(
                thread.customer?.firstName,
                thread.customer?.lastName,
              );
              return (
                <button
                  key={thread.id}
                  type="button"
                  className={`msg-list__item${thread.id === activeId ? " msg-list__item--active" : ""}`}
                  onClick={() => setSelectedId(thread.id)}
                >
                  <span className="msg-list__avatar" aria-hidden="true">
                    {name.slice(0, 1)}
                  </span>
                  <span className="msg-list__copy">
                    <span className="msg-list__name">{name}</span>
                    <span className="msg-list__preview">
                      {thread.lastMessage?.body || "No messages yet"}
                    </span>
                  </span>
                </button>
              );
            })
          )}
        </aside>

        <section className="msg-thread" aria-label="Conversation">
          <div className="msg-thread__header">
            <div className="msg-thread__icon">
              <MessageCircleMore size={20} />
            </div>
            <div>
              <p className="msg-thread__name">
                {displayName(active?.customer?.firstName, active?.customer?.lastName, "Select a conversation")}
              </p>
              <p className="msg-thread__meta">{active?.customer?.email || "Online"}</p>
            </div>
          </div>

          <div ref={bodyRef} className="msg-thread__body">
            {messages.map((message) => {
              const fromAdmin = message.senderId !== active?.customerId;
              return (
                <div
                  key={message.id}
                  className={`msg-bubble ${fromAdmin ? "msg-bubble--out" : "msg-bubble--in"}`}
                >
                  {message.body && message.body !== "Attachment" && <p>{message.body}</p>}
                  {message.attachments?.map((attachment) =>
                    isVideo(attachment.url, attachment.mimeType) ? (
                      <video
                        key={attachment.url}
                        src={attachment.url}
                        controls
                        className="msg-bubble__media"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={attachment.url}
                        src={attachment.url}
                        alt="Attachment"
                        className="msg-bubble__media"
                      />
                    ),
                  )}
                </div>
              );
            })}
          </div>

          {files.length > 0 && (
            <p className="msg-files">{files.length} file{files.length > 1 ? "s" : ""} attached</p>
          )}

          <form className="msg-composer" onSubmit={handleSend}>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="msg-composer__file"
              onChange={(event) => {
                setFiles(Array.from(event.target.files ?? []).slice(0, 5));
                event.target.value = "";
              }}
            />
            <button
              type="button"
              className="msg-composer__icon"
              aria-label="Attach a file"
              onClick={() => fileRef.current?.click()}
            >
              <Paperclip size={16} />
            </button>
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message here"
              className="msg-composer__input"
              disabled={!activeId}
            />
            <button
              type="submit"
              className="msg-composer__icon"
              aria-label="Send message"
              disabled={!activeId || sending || (!draft.trim() && !files.length)}
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
