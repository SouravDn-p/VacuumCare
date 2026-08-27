"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL, baseApi } from "@/redux/features/api/baseApi";
import { getAccessToken } from "@/lib/useCookies";

export default function NotificationStreamProvider() {
  const dispatch = useDispatch();

  useEffect(() => {
    let controller: AbortController | null = null;
    let retryTimer: number | undefined;
    let connectedToken: string | undefined;

    const disconnect = () => {
      controller?.abort();
      controller = null;
      if (retryTimer) window.clearTimeout(retryTimer);
    };

    const connect = async (token: string) => {
      disconnect();
      controller = new AbortController();
      const active = controller;
      try {
        const response = await fetch(`${BASE_URL}/notifications/stream`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/event-stream",
          },
          signal: active.signal,
        });
        if (!response.ok || !response.body) {
          throw new Error("Notification stream unavailable");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (!active.signal.aborted) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const chunks = buffer.split("\n\n");
          buffer = chunks.pop() ?? "";
          for (const chunk of chunks) {
            const line = chunk
              .split("\n")
              .find((item) => item.startsWith("data:"));
            if (!line) continue;
            try {
              const payload = JSON.parse(line.slice(5).trim()) as {
                type?: string;
              };
              if (payload.type === "refresh") {
                dispatch(
                  baseApi.util.invalidateTags([
                    "Notifications",
                    "AdminNotifications",
                  ]),
                );
              }
            } catch {
              /* ignore malformed SSE frames */
            }
          }
        }
      } catch {
        if (!active.signal.aborted) {
          retryTimer = window.setTimeout(() => {
            const tokenNow = getAccessToken();
            if (tokenNow) void connect(tokenNow);
          }, 8000);
        }
      }
    };

    const sync = () => {
      const token = getAccessToken();
      if (token === connectedToken) return;
      connectedToken = token;
      if (token) {
        void connect(token);
      } else {
        disconnect();
      }
    };

    sync();
    const timer = window.setInterval(sync, 4000);

    return () => {
      window.clearInterval(timer);
      disconnect();
    };
  }, [dispatch]);

  return null;
}
