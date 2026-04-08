import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "OurPrenup — Online Prenuptial Agreements",
  description:
    "Create your prenuptial agreement online. Affordable, attorney-reviewed, legally binding in all 50 states.",
};

const clerkKeyConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("REPLACE_ME");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const body = (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );

  // Skip ClerkProvider when keys aren't configured (dev without Clerk setup)
  if (!clerkKeyConfigured) return body;

  return <ClerkProvider>{body}</ClerkProvider>;
}
