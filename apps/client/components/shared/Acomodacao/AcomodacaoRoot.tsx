"use client";

import React from "react";

export interface AcomodacaoRootProps {
  className?: string;
  children: React.ReactNode;
  maxCapacity?: number;
  images?: Array<string>;
  direction?: "vertical" | "horizontal";
}

export function AcomodacaoRoot({ direction = "vertical", ...props }: AcomodacaoRootProps) {
  return (
    <article className={`Acomodacao Acomodacao--${direction} ${props.className}  isolate`}>
      {props.children}
    </article>
  );
}
