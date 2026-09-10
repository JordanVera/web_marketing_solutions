"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";

type Status = "idle" | "submitting" | "success";

/**
 * UI-only signup. Point `submit` at your ESP (Mailchimp, Resend, ConvertKit,
 * a Next.js route handler, …) when the backend is ready.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || status !== "idle") return;

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    setEmail("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "success") setStatus("idle");
          }}
          placeholder="you@company.com"
          autoComplete="email"
          className="h-12 w-full rounded-full border border-white/10 bg-white/[0.04] pr-14 pl-5 text-sm text-cream placeholder:text-muted-dim focus:border-electric-400/60 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status !== "idle"}
          aria-label="Subscribe to the newsletter"
          className="absolute top-1.5 right-1.5 grid size-9 place-items-center rounded-full bg-electric text-void transition-all duration-300 hover:bg-electric-400 disabled:opacity-60"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.span
                key="done"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="size-4" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Send className="size-4" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </form>

      <p aria-live="polite" className="mt-3 min-h-5 text-xs text-muted-dim">
        {status === "success"
          ? "You're on the list — welcome aboard."
          : "One email a month on search, speed, and conversion. No spam."}
      </p>
    </div>
  );
}
