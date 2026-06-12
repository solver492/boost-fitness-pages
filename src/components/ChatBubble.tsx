import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, X, Send, Dumbbell, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n";

const transport = new DefaultChatTransport({ api: "/api/chat" });

export function ChatBubble() {
  const { t, locale, dir } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport,
    onError: (e) => console.error("[chat]", e),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text }, { body: { locale } });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI coach chat"
        className={`fixed z-[60] bottom-4 ${dir === "rtl" ? "left-4" : "right-4"} h-14 w-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-zinc-950 shadow-2xl shadow-orange-500/40 grid place-items-center hover:scale-105 active:scale-95 transition`}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-zinc-950 animate-pulse" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          dir={dir}
          className={`fixed z-[60] bottom-20 ${dir === "rtl" ? "left-2 sm:left-4" : "right-2 sm:right-4"} w-[calc(100vw-1rem)] sm:w-[380px] h-[70vh] sm:h-[560px] max-h-[80vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-orange-500/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
            <span className="grid place-items-center h-9 w-9 rounded-full bg-orange-500 text-zinc-950 shrink-0">
              <Dumbbell className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-white font-bold text-sm truncate">{t("chat.title")}</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {t("chat.subtitle")}
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white p-1" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl rounded-tl-sm p-3 text-sm text-zinc-200">
                {t("chat.welcome")}
              </div>
            )}
            {messages.map((m: UIMessage) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] text-sm whitespace-pre-wrap leading-relaxed px-3.5 py-2.5 rounded-2xl ${
                      isUser
                        ? "bg-orange-500 text-zinc-950 font-medium rounded-br-sm"
                        : "bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-bl-sm"
                    }`}
                  >
                    {text || (m.role === "assistant" && isLoading ? "…" : "")}
                  </div>
                </div>
              );
            })}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Loader2 className="h-3 w-3 animate-spin" /> {t("chat.thinking")}
              </div>
            )}
            {error && <div className="text-xs text-red-400">{t("chat.error")}</div>}
          </div>

          {/* Composer */}
          <form onSubmit={handleSend} className="border-t border-zinc-800 p-3 flex items-center gap-2 bg-zinc-900/60">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              disabled={isLoading}
              className="flex-1 bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 rounded-full px-4 py-2.5 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="grid place-items-center h-10 w-10 rounded-full bg-orange-500 text-zinc-950 disabled:opacity-50 hover:bg-orange-400 transition"
              aria-label={t("chat.send")}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
