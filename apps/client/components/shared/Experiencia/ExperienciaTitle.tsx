import React, { HTMLProps } from "react";

interface ExperienciaTitleProps extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function ExperienciaTitle(props: ExperienciaTitleProps) {
  return (
    <h1 {...props} className={`Experiencia__title ${props.className}`}>
      {props.children}
    </h1>
  );
}
