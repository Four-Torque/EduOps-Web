import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import "../../styles/globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: { default: "EduOps", template: "%s | EduOps" },
  description: "교육 운영 관리 시스템 — 원생, 강사, 강좌, 성적을 한 곳에서",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${pretendard.variable} font-pretendard antialiased bg-slate-50`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
