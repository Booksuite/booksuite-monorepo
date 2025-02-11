import React from "react";

interface PageConfirmacaoDePagamentoProps {
  children: React.ReactNode;
}

export default function PageConfirmacaoDePagamento({ children }: PageConfirmacaoDePagamentoProps) {
  return (
    <div className="PageConfirmacaoDePagamento py-16">
      <div className="container">{children}</div>
    </div>
  );
}
