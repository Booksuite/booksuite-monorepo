import React, { HTMLProps } from 'react';

interface AcomodacaoFeatureProps extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function AcomodacaoFeature(props: AcomodacaoFeatureProps) {
  return (
    <h1 {...props} className={`Acomodacao__feature ${props.className}`}>
      {props.children}
    </h1>
  );
}
