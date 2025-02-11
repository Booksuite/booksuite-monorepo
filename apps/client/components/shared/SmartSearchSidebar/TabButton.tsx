import React, { type ButtonHTMLAttributes, type HTMLAttributes } from "react";

interface TabButton extends HTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
}

export function TabButton({ children, isSelected = false, ...props }: TabButton) {
  return (
    <button
      {...props}
      type="button"
      className={`text-sm p-2 border-b-2  ${
        isSelected ? "border-black font-semibold" : "border-transparent"
      } ${props.className}`}
    >
      {children}
    </button>
  );
}
