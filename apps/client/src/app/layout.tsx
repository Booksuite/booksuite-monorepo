import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import type { Metadata } from "next";
//import "react-date-range/dist/styles.css";
//import "react-date-range/dist/theme/default.css";
//import "@/assets/styles/index.scss";
//import "swiper/css";
//import "swiper/css/navigation";
//import "swiper/css/pagination";
//import "swiper/css/scrollbar";

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
  // Fetch company data from API and set theme dynamically
  // const respRaw = await fetch(`${process.env.API_URL}/company/${process.env.COMPANY_ID}`);
  let company = {
    theme: "#7f5440", // Default theme color in case of failure
  };

  /* if (respRaw.ok) {
    const data = await respRaw.json();
    company = data.company;
  }*/

  return (
    <html
      lang="en"
      style={{ "--clr-primary": company.theme } as React.CSSProperties} // Apply dynamic theme color
    >
      <body className={inter.className}> 
        <Header/>
        {/*<Providers>*/}{children}{/*</Providers>*/} {/* Wrap children with global providers */}
        <Footer/>
      </body>
    </html>
  );
}
