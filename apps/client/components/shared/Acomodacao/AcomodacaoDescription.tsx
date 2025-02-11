import React, { HTMLProps } from 'react';

interface AcomodacaoDescriptionProps extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function AcomodacaoDescription(props: AcomodacaoDescriptionProps) {
  return (
    <div
      {...props}
      className={`Acomodacao__description text-ellipsis line-clamp-5 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
