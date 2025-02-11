import React, { HTMLProps } from "react";

interface ExperienciaBodyProps extends HTMLProps<HTMLDivElement> {}

export function ExperienciaBody(props: ExperienciaBodyProps) {
  return (
    <div className="Experiencia__body" {...props}>
      {props.children}
    </div>
  );
}
