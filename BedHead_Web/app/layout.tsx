import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import CookieConsent from "@/components/CookieConsent";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BedHead — the alarm you can't sleep through",
  description:
    "BedHead is an alarm app that only stops going off when you take a selfie. Join the waitlist for launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${bricolage.variable} ${inter.variable} antialiased`}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <CookieConsent />
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
