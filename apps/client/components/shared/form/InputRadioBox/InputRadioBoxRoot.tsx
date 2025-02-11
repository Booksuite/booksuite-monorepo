import React, {
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
} from "react";

interface InputRadioBoxRoot extends LabelHTMLAttributes<HTMLLabelElement> {}

export function InputRadioBoxRoot({ children, ...props }: InputRadioBoxRoot) {
  return (
    <label
      {...props}
      className={`InputRadioBoxRoot flex items-center justify-between ${props.className}`}
    >
      {children}
    </label>
  );
}
