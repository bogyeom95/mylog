import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import React from "react";
import SidebarMenu from "@/components/sidebar-menu";
import Footer from "@/components/footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--roboto-text",
});

export const metadata: Metadata = {
  title: {
    template: "Just Archives | %s",
    default: "Just Archives",
  },
  description:
    "기술 통찰과 개인적인 삶의 기록을 모아 놓은 아카이브. 다양한 생각, 아이디어, 경험이 한 곳에 담긴 여정.",
  keywords: [
    "기술 기록",
    "삶의 기록",
    "Just Archives",
    "개인 아카이브",
    "일상 노트",
    "기술 인사이트",
    "개인 블로그",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} min-h-screen`}>
        <Header />
        <div className="flex justify-center min-h-[calc(100dvh-8rem)]">
          {/* 사이드바 - lg 이상일 때만 보이도록 설정 */}

          {/* 메인 콘텐츠 영역 */}
          <main className="">{children}</main>

          <aside className="hidden xl:flex  xl:w-1/5 sticky top-20   overflow-y-auto overflow-x-hidden z-10">
            <SidebarMenu />
          </aside>
        </div>
        <Footer />
      </body>
    </html>
  );
}
