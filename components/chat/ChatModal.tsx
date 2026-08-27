"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircleMore, Paperclip, Send, X } from "lucide-react";

import { useChat } from "@/context/ChatContext";
import { getAccessToken, getUser } from "@/lib/useCookies";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import toast from "react-hot-toast";
import {
  useGetConversationMessagesQuery,
  useMarkConversationReadMutation,
  useOpenSupportConversationMutation,
  useSendConversationMessageMutation,
} from "@/redux/features/api/customer/service/customerServiceApi";

function isVideo(url: string, mimeType?: string) {
  return Boolean(mimeType?.startsWith("video/") || /\.(mp4|mov|webm)$/i.test(url));
}

export default function ChatModal() {
  const { isOpen, closeChat } = useChat();
  const token = Boolean(getAccessToken());
  const user = getUser();
  const fileRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [openSupport, { isLoading: opening }] =
    useOpenSupportConversationMutation();
  const [sendMessage, { isLoading: sending }] =
    useSendConversationMessageMutation();
  const [markRead] = useMarkConversationReadMutation();

  const { data: messages = [] } = useGetConversationMessagesQuery(
    conversationId ?? "",
    {
      skip: !conversationId || !isOpen,
      pollingInterval: isOpen ? 2500 : 0,
    },
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeChat]);

  useEffect(() => {
    if (!isOpen || !token || conversationId) return;
    void openSupport()
      .unwrap()
      .then((conversation) => {
        setConversationId(conversation.id);
        void markRead(conversation.id);
      })
      .catch((error) => {
        toast.error(getApiErrorMessage(error, "Unable to start live chat"));
      });
  }, [conversationId, isOpen, markRead, openSupport, token]);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();
    if (!conversationId) return;
    const text = draft.trim();
    if (!text && !files.length) return;

    const images = files.filter((file) => file.type.startsWith("image/"));
    const videos = files.filter((file) => file.type.startsWith("video/"));

    try {
      await sendMessage({
        conversationId,
        data: { body: text, images, videos },
      }).unwrap();
      setDraft("");
      setFiles([]);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Message could not be sent"));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      onClick={closeChat}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Live chat"
        onClick={(event) => event.stopPropagation()}
        className="flex h-[600px] w-full max-w-[380px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_20px_50px_rgba(0,56,57,0.25)]"
      >
        <div className="flex items-center justify-between border-b border-[#eef2f5] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f2f7ff] text-[#1a73e8]">
              <MessageCircleMore size={20} strokeWidth={1.9} />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22c55e] ring-2 ring-white" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#0f1720]">Live Support</p>
              <p className="text-[12px] text-[#22c55e]">
                {opening ? "Connecting..." : "Online"}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={closeChat}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#587786] transition hover:bg-[#f2f7ff]"
          >
            <X size={18} />
          </button>
        </div>

        {!token ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-[14px] text-[#4f5960]">
              Sign in to chat live with Enhancement support.
            </p>
            <Link
              href="/login?next=/"
              className="h-10 rounded-[8px] bg-[#1a73e8] px-5 text-[13px] font-semibold leading-10 text-white"
              onClick={closeChat}
            >
              Log in
            </Link>
          </div>
        ) : (
          <>
            <div
              ref={bodyRef}
              className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#f7f9fc] px-4 py-5"
            >
              {messages.length === 0 && (
                <div className="self-start max-w-[80%] rounded-2xl rounded-bl-sm bg-[#e4edfb] px-4 py-2.5 text-[13.5px] leading-relaxed text-[#25313a]">
                  Hi! Welcome to Enhancement support. How can we help
                  you today?
                </div>
              )}
              {messages.map((message) => {
                const fromUser = message.senderId === user?.id;
                return (
                  <div
                    key={message.id}
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                      fromUser
                        ? "self-end rounded-br-sm bg-[#1a73e8] text-white"
                        : "self-start rounded-bl-sm bg-[#e4edfb] text-[#25313a]"
                    }`}
                  >
                    {message.body && message.body !== "Attachment" && (
                      <p>{message.body}</p>
                    )}
                    {message.attachments?.map((attachment) =>
                      isVideo(attachment.url, attachment.mimeType) ? (
                        <video
                          key={attachment.url}
                          src={attachment.url}
                          controls
                          className="mt-2 max-h-40 w-full rounded-lg"
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={attachment.url}
                          src={attachment.url}
                          alt="Attachment"
                          className="mt-2 max-h-40 w-full rounded-lg object-cover"
                        />
                      ),
                    )}
                  </div>
                );
              })}
            </div>

            {files.length > 0 && (
              <p className="px-4 pt-2 text-[12px] text-[#587786]">
                {files.length} file{files.length > 1 ? "s" : ""} attached
              </p>
            )}

            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-[#eef2f5] px-4 py-3"
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={(event) => {
                  const next = Array.from(event.target.files ?? []).slice(0, 5);
                  setFiles(next);
                  event.target.value = "";
                }}
              />
              <button
                type="button"
                aria-label="Attach a file"
                onClick={() => fileRef.current?.click()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-white"
              >
                <Paperclip size={16} />
              </button>
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type your message here"
                aria-label="Type your message"
                className="h-10 flex-1 rounded-full bg-[#eef4fd] px-4 text-[13.5px] text-[#0f1720] outline-none placeholder:text-[#8098ad]"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={sending || (!draft.trim() && !files.length)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-white transition hover:bg-[#0865d7] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
