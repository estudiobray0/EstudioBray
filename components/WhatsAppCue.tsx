"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { whatsappHref } from "@/lib/site";

const SHOW_MS = 8000;
const HIDE_MS = 16000;

export function WhatsAppCue() {
  const t = useTranslations("chat");
  const panelId = useId();
  const [panelOpen, setPanelOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(true);
  const [draft, setDraft] = useState("");
  const [burst, setBurst] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);
  const burstTimer = useRef(0);
  const hoverTimer = useRef(0);
  const openedByHover = useRef(false);

  function playWave() {
    window.clearTimeout(burstTimer.current);
    setBurst(false);
    requestAnimationFrame(() => {
      setBurst(true);
      burstTimer.current = window.setTimeout(() => setBurst(false), 700);
    });
  }

  useEffect(() => {
    return () => {
      window.clearTimeout(burstTimer.current);
      window.clearTimeout(hoverTimer.current);
    };
  }, []);

  useEffect(() => {
    if (panelOpen) return;

    let hideTimer = 0;
    let showTimer = 0;

    const hide = () => {
      setPromptOpen(false);
      showTimer = window.setTimeout(show, HIDE_MS);
    };

    const show = () => {
      setPromptOpen(true);
      hideTimer = window.setTimeout(hide, SHOW_MS);
    };

    hideTimer = window.setTimeout(hide, SHOW_MS);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(showTimer);
    };
  }, [panelOpen]);

  useEffect(() => {
    if (!panelOpen) return;
    if (!openedByHover.current) field.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  function openPanel(fromHover = false) {
    openedByHover.current = fromHover;
    setPanelOpen(true);
    setPromptOpen(false);
  }

  function closeSoon() {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setPanelOpen(false), 220);
  }

  function stayOpen() {
    window.clearTimeout(hoverTimer.current);
  }

  function send(event: FormEvent) {
    event.preventDefault();
    const message = draft.trim() || t("whatsapp");
    const href = whatsappHref(message);
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = href;
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-5 z-50 sm:right-6 sm:bottom-8">
      <div
        className="pointer-events-auto flex flex-col items-end gap-2"
        onMouseEnter={stayOpen}
        onMouseLeave={closeSoon}
      >
      {panelOpen ? (
        <form
          id={panelId}
          role="dialog"
          aria-label={t("cta")}
          onSubmit={send}
          className="chat-prompt-in pointer-events-auto w-[min(calc(100vw-2rem),19rem)] overflow-hidden rounded-2xl rounded-br-md border border-line bg-white"
        >
          <div className="flex items-center justify-between gap-3 bg-sage px-3 py-2">
            <p className="text-[10px] font-medium tracking-[0.14em] text-white uppercase">
              {t("name")}
            </p>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="shrink-0 text-xs tracking-[0.12em] text-white/80 uppercase hover:text-white"
              aria-label={t("close")}
            >
              {t("close")}
            </button>
          </div>
          <div className="p-3.5">
            <p className="text-sm text-ink">{t("cta")}</p>
            <p className="text-muted mt-1 text-xs leading-relaxed">
              {t("intro")}
            </p>
            <label className="sr-only" htmlFor={`${panelId}-message`}>
              {t("placeholder")}
            </label>
            <textarea
              id={`${panelId}-message`}
              ref={field}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder={t("placeholder")}
              rows={4}
              className="mt-3 w-full resize-none rounded-lg border border-line bg-paper px-3 py-2.5 text-sm leading-relaxed text-ink outline-none placeholder:text-muted/70 focus:border-sage"
            />
            <button
              type="submit"
              className="btn-primary mt-3 w-full rounded-full py-2.5 text-sm"
            >
              {t("send")}
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={openPanel}
          tabIndex={promptOpen ? 0 : -1}
          aria-hidden={!promptOpen}
          className={`pointer-events-auto max-w-[12.5rem] rounded-2xl rounded-br-md border border-line bg-white px-3 py-2 text-left text-xs leading-snug text-ink transition-colors hover:border-sage ${
            promptOpen ? "chat-prompt-in" : "chat-prompt-out"
          }`}
        >
          <span className="text-sage mb-0.5 block text-[10px] font-medium tracking-[0.14em] uppercase">
            {t("name")}
          </span>
          {t("question")} {t("cta")}
        </button>
      )}
      <button
        type="button"
        onMouseEnter={() => {
          playWave();
          stayOpen();
          openPanel(true);
        }}
        onClick={() => {
          playWave();
          if (openedByHover.current && panelOpen) {
            openedByHover.current = false;
            return;
          }
          if (panelOpen) setPanelOpen(false);
          else openPanel(false);
        }}
        aria-expanded={panelOpen}
        aria-controls={panelOpen ? panelId : undefined}
        aria-label={panelOpen ? t("close") : t("open")}
        className={`chat-dots flex items-center gap-1.5 p-1 ${
          burst ? "chat-dots--burst" : ""
        }`}
      >
        <span className="chat-wave-dot bg-brown size-4 rounded-full" />
        <span className="chat-wave-dot bg-sage size-4 rounded-full" />
        <span className="chat-wave-dot bg-blue size-4 rounded-full" />
      </button>
      </div>
    </div>
  );
}
