import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BedHead Terms & Conditions",
  description: "Terms & Conditions for the BedHead launch waitlist.",
};

export default function Terms() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
      <Link
        href="/"
        className="text-sm text-foreground/60 underline underline-offset-2 hover:text-foreground"
      >
        Back to BedHead
      </Link>

      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">
        Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-sm text-foreground/60">
        Last updated 17 September 2026
      </p>

      <div className="mt-10 flex flex-col gap-10 text-foreground/80">
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-medium text-foreground">
            1. What this page covers
          </h2>
          <p className="leading-relaxed">
            BedHead hasn&apos;t launched yet. These terms cover the one thing
            you can do on this site right now: join the launch waitlist by
            giving us your email address. They&apos;ll be replaced with full
            terms of service once the app is live.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-medium text-foreground">
            2. Why we ask for your email
          </h2>
          <p className="leading-relaxed">
            We collect your email for one purpose only: to send you a
            one-time discount code (70% off your first 3 months of BedHead
            Premium) when the app launches, plus a short heads-up that
            launch has happened. We don&apos;t use it for anything else, and
            we don&apos;t sell or share it with third parties.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-medium text-foreground">
            3. How long we keep it
          </h2>
          <p className="leading-relaxed">
            We keep your email on the waitlist until launch, after which
            it&apos;s used to send your discount code and then deleted from
            our marketing list. You can ask us to remove it sooner at any
            time. See &ldquo;Contact us&rdquo; below.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-medium text-foreground">
            4. Cookies &amp; local storage
          </h2>
          <p className="leading-relaxed">
            This site uses local storage for one thing: remembering whether
            you accepted or declined the cookie banner, so we don&apos;t ask
            again. We don&apos;t currently use any third-party tracking or
            advertising cookies. If that changes ahead of launch, we&apos;ll
            update this page and ask again.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-medium text-foreground">
            5. Your rights
          </h2>
          <p className="leading-relaxed">
            You can leave the waitlist and have your email deleted at any
            time, free of charge. Just get in touch. Every launch email
            we send will also include an unsubscribe link.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-medium text-foreground">
            6. Changes to these terms
          </h2>
          <p className="leading-relaxed">
            We may update this page as BedHead gets closer to launch.
            The &ldquo;last updated&rdquo; date above will always reflect
            the latest version.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-medium text-foreground">
            7. Contact us
          </h2>
          <p className="leading-relaxed">
            Questions, or want your email removed? Reach us at{" "}
            <a
              href="mailto:hello@bedheadapp.com"
              className="underline underline-offset-2 hover:text-foreground"
            >
              hello@bedheadapp.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
