import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import React from "react";

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
      <body className={`${roboto.variable} `}>
        <Header />
        {children}
      </body>
    </html>
  );
}
