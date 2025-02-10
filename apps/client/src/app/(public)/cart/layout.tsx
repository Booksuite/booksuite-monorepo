import React from "react";

import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export default function LayoutCarrinho({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="LayoutCarrinho py-4 bg-opacity">
      <div className="container">{children}</div>
    </div>
  );
}
