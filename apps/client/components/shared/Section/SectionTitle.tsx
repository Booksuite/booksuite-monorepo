import React, { HTMLProps } from 'react';

interface SectionTitleProps extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function SectionTitle(props: SectionTitleProps) {
  return (
    <h1 {...props} className={`Section__title ${props.className}`}>
      {props.children}
    </h1>
  );
}
