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
  title: "BedHead: take control of your mornings",
  description:
    "BedHead is the alarm that keeps you accountable with a selfie. Join the waitlist for 70% off Premium at launch.",
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
