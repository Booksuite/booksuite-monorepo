import React, { HTMLProps } from 'react';

interface AcomodacaoTitleProps extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function AcomodacaoTitle(props: AcomodacaoTitleProps) {
  return (
    <h1 {...props} className={`Acomodacao__title ${props.className}`}>
      {props.children}
    </h1>
  );
}
