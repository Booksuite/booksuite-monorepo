import React from "react";

export interface SectionRootProps {
  className?: string;
  children?: React.ReactNode;
}

export function SectionRoot(props: SectionRootProps) {
  return (
    <section {...props} className={`Section section-py ${props.className}`}>
      {props.children}
    </section>
  );
}
