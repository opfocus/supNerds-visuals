import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "supNerds Visuals",
  referrer: "origin-when-cross-origin",
  keywords: [
    "OP",
    "optimism",
    "op stack",
    "SuperChain",
    "contribution path",
    "support",
    "supNerds",
  ],
  title: "supNerds Visuals",
  creator: "simple8720",
  icons: {
    icon: "/Profile-Logo.png",
  },

  // metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  // alternates: {
  //   canonical: "/",
  // },
  description:
    "Optimism support NERDs are highly values aligned with Optimism and are of course highly Optimistic! Support NERDs provide support to the Optimism Discord, helping users with questions, and pointing people in the right direction.",

  openGraph: {
    title: 'supNerds Visuals"',
    url: "/",
    description:
      "Optimism support NERDs are highly values aligned with Optimism and are of course highly Optimistic! Support NERDs provide support to the Optimism Discord, helping users with questions, and pointing people in the right direction.",
    siteName: "supNerds Visuals",
    images: ["/Chart-from-fao.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
