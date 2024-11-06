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
      <body className={`${roboto.variable} min-h-screen`}>
        <Header />
        <div className="flex justify-center ">
          {/* 사이드바 - lg 이상일 때만 보이도록 설정 */}

          {/* 메인 콘텐츠 영역 */}
          <main className="min-h-screen">{children}</main>

          <aside className="hidden xl:flex  xl:w-1/5 sticky top-16 h-[calc(100vh-4rem)]  overflow-y-auto overflow-x-hidden z-10">
            <SidebarMenu />
          </aside>
        </div>
        <Footer />
      </body>
    </html>
  );
}
