import type { Metadata } from "next";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./globals.css";
import "@/assets/styles/index.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Inter } from "next/font/google";

import { Providers } from "@/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booksuite",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const respRaw = await fetch(`${process.env.API_URL}/company/${process.env.COMPANY_ID}`);
  let company = {
    theme: "#7f5440",
  };

  if (respRaw.ok) {
    const data = await respRaw.json();
    company = data.company;
  }

  return (
    <html
      lang="en"
      style={
        {
          "--clr-primary": company.theme,
        } as React.CSSProperties
      }
    >
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
