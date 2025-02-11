import React, { HTMLProps } from 'react';

interface SectionSubTitleProps extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function SectionSubTitle(props: SectionSubTitleProps) {
  return (
    <h2 {...props} className={`Section__subtitle ${props.className}`}>
      {props.children}
    </h2>
  );
}
