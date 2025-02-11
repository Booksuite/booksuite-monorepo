import React from "react";

import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export default function LayoutTransparentHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="LayoutTransparentHeader">
      <Header variant="transparent" />

      {children}

      <Footer />
    </div>
  );
}
