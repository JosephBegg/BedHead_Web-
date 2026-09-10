"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Signup />
      </main>
      <Footer />
    </>
  );
}

function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center px-6 pt-8 sm:px-8">
      <span className="font-display text-lg font-semibold tracking-tight">
        BedHead
      </span>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-14 sm:px-8 md:flex-row md:items-center md:gap-12 md:pt-20">
      <div className="flex flex-col gap-6 md:max-w-md">
        <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Wake up
          <br />
          on camera.
        </h1>
        <p className="max-w-[38ch] text-lg leading-relaxed text-foreground/75">
          One rule: no selfie, no silence. Take a photo of your very awake,
          very unfixed bedhead, and BedHead finally shuts up.
        </p>
        <a
          href="#signup"
          className="inline-flex w-fit items-center rounded-full bg-flash px-6 py-3 text-base font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Join the waitlist
        </a>
      </div>
      <div className="flex-1">
        <PhoneMock />
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-xs -rotate-2 rounded-[2rem] border border-line bg-background p-3 shadow-2xl shadow-black/10 md:mx-0 md:ml-auto">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-dawn to-flash-tint">
        <div className="absolute left-1/2 top-[36%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/10" />
        <div className="absolute left-1/2 top-[74%] h-36 w-52 -translate-x-1/2 rounded-t-full bg-foreground/10" />

        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-sm font-medium text-foreground shadow-sm backdrop-blur">
          7:04 AM
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-background/90 px-4 py-3 shadow-sm backdrop-blur">
          <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <FlameIcon className="h-4 w-4 text-flash" />
            14-day streak
          </span>
          <span className="flex items-center gap-1.5 text-sm text-foreground/70">
            <CheckIcon className="h-3.5 w-3.5" />
            Selfie verified
          </span>
        </div>

        <ViewfinderCorner position="tl" />
        <ViewfinderCorner position="tr" />
        <ViewfinderCorner position="bl" />
        <ViewfinderCorner position="br" />

        <div className="flash-once pointer-events-none absolute inset-0 bg-white" />
      </div>
    </div>
  );
}

function ViewfinderCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const placement: Record<typeof position, string> = {
    tl: "left-3 top-3 border-l-[3px] border-t-[3px]",
    tr: "right-3 top-3 border-r-[3px] border-t-[3px]",
    bl: "left-3 bottom-3 border-l-[3px] border-b-[3px]",
    br: "right-3 bottom-3 border-r-[3px] border-b-[3px]",
  };
  return (
    <div
      className={`absolute h-6 w-6 border-flash/80 ${placement[position]}`}
    />
  );
}

const FEATURES = [
  {
    icon: CameraIcon,
    title: "Selfie to dismiss",
    description:
      "No fingerprint, no swipe. The alarm only stops when it sees your face — awake, upright, unmistakably you.",
  },
  {
    icon: FlameIcon,
    title: "Streaks that stick",
    description:
      "Every selfie extends your streak. Miss a morning and watch it reset — the same pressure that gets you out for a run.",
  },
  {
    icon: ImageIcon,
    title: "Shareable mornings",
    description:
      "Every wake-up saves to a gallery you can look back on, or send straight to the group chat that judges your bedhead.",
  },
];

function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
      <div className="flex flex-col gap-6 md:max-w-2xl">
        <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
          The snooze button doesn&apos;t ask for proof.
        </p>
        <p className="text-lg leading-relaxed text-foreground/75">
          It just asks you to try again in nine minutes — and most mornings,
          you don&apos;t. BedHead skips the trust exercise. The alarm keeps
          going until you take a selfie: wide awake, on camera, undeniably
          up.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-3 sm:gap-8">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-3 sm:border-l sm:border-line sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
          >
            <Icon className="h-6 w-6 text-flash" />
            <h3 className="font-display text-xl font-medium">{title}</h3>
            <p className="leading-relaxed text-foreground/70">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

type Status = "idle" | "loading" | "success" | "already" | "error";

function Signup() {
  const subscribe = useMutation(api.subscribers.subscribe);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (status !== "idle" && status !== "loading") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (honeypotRef.current?.value) {
      return;
    }

    const trimmed = email.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const result = await subscribe({ email: trimmed });
      if (result.status === "subscribed") {
        setStatus("success");
        setMessage("You're on the list — we'll email you at launch.");
      } else if (result.status === "already_subscribed") {
        setStatus("already");
        setMessage("You're already on the list. Hang tight.");
      } else {
        setStatus("error");
        setMessage("Enter a valid email address.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again in a moment.");
    }
  }

  return (
    <section
      id="signup"
      className="border-y border-line bg-dawn/60 px-6 py-24 sm:px-8"
    >
      <div className="mx-auto flex max-w-lg flex-col items-start gap-3 sm:items-center sm:text-center">
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Be the first to know when we launch
        </h2>
        <p className="text-foreground/70">
          No spam. Just one email when BedHead is ready to download.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-start"
        noValidate
      >
        <input
          ref={honeypotRef}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-0 w-0 opacity-0"
          style={{ left: "-9999px" }}
        />
        <div className="flex-1">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full rounded-full border border-line bg-background px-5 py-3 text-base outline-none transition-colors focus:border-flash disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-flash px-6 py-3 text-base font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
        >
          {status === "loading" ? "Joining…" : "Join the waitlist"}
        </button>
      </form>

      {message && (
        <p
          role="status"
          className={`mx-auto mt-3 flex max-w-lg items-center gap-1.5 text-sm sm:justify-center ${
            status === "error" ? "text-flash" : "text-foreground/70"
          }`}
        >
          {(status === "success" || status === "already") && (
            <CheckIcon className="h-4 w-4 shrink-0" />
          )}
          {message}
        </p>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between text-sm text-foreground/60">
        <span className="font-display font-medium text-foreground">
          BedHead
        </span>
        <span>© {new Date().getFullYear()} BedHead</span>
      </div>
    </footer>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
