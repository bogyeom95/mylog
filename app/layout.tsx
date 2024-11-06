import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import React from "react";
import SidebarMenu from "@/components/sidebar-menu";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--roboto-text",
});

export const metadata: Metadata = {
  title: {
    template: "%s | MyLog ",
    default: "MyLog",
  },

  description: "tech & life blog by me",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <Header />
        <div className="flex justify-center">
          {/* 사이드바 - lg 이상일 때만 보이도록 설정 */}

          {/* 메인 콘텐츠 영역 */}
          <main className="">{children}</main>
          <aside className="hidden xl:flex mb-8 lg:w-1/5 sticky top-0 h-screen mt-8 overflow-y-auto  ">
            <SidebarMenu />
          </aside>
        </div>
      </body>
    </html>
  );
}
