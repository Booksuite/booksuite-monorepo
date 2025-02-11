import React, { type HTMLAttributes, type LabelHTMLAttributes } from "react";

interface InputRadioBoxLabelAreaProps extends HTMLAttributes<HTMLDivElement> {}

export function InputRadioBoxLabelArea({ children, ...props }: InputRadioBoxLabelAreaProps) {
  return <div {...props}>{children}</div>;
}
