import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nagaja.site"),
  title: "내 퇴사일은 언제일까?",
  description:
    "8개 질문으로 알아보는 나의 예상 퇴사일. 당신의 퇴사일을 계산해드립니다.",
  openGraph: {
    title: "내 퇴사일은 언제일까?",
    description: "8개 질문으로 알아보는 나의 예상 퇴사일",
    url: "https://nagaja.site",
    siteName: "나가자",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "내 퇴사일은 언제일까?",
    description: "8개 질문으로 알아보는 나의 예상 퇴사일",
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
        <footer className="py-4 text-center text-xs text-zinc-400 dark:text-zinc-600">
          © 2026 junseoparkk
        </footer>
      </body>
    </html>
  );
}
