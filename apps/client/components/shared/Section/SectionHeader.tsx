import React, { HTMLProps } from "react";

interface SectionHeaderProps extends HTMLProps<HTMLElement> {
  children: React.ReactNode;
}

export function SectionHeader(props: SectionHeaderProps) {
  return (
    <header {...props} className={`Section__header ${props.className}`}>
      {props.children}
    </header>
  );
}
