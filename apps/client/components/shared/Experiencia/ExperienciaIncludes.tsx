import React, { HTMLProps } from "react";

interface ExperienciaIncludesProps extends HTMLProps<HTMLParagraphElement> {
  includes: Array<string>;
}

export function ExperienciaIncludes(props: ExperienciaIncludesProps) {
  return (
    <p {...props} className={`Experiencia__includes ${props.className}`}>
      <b>Inclui:</b>{" "}
      {props.includes?.map((include, index) => (
        <span className="inline-block" key={index}>
          {include}

          {index + 1 < props.includes!.length && (
            <span className="px-1">·</span>
          )}
        </span>
      ))}
    </p>
  );
}
