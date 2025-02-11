import React from "react";

import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="LayoutDefault">
      <Header />

      {children}

      <Footer />
    </div>
  );
}
