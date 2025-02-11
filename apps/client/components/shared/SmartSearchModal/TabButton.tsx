import React, { type HTMLAttributes } from "react";

interface TabButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

export function TabButton({ children, active = false, ...props }: TabButtonProps) {
  const activeClasses = "bg-white bg-opacity text-black rounded-t-lg";

  return (
    <button
      {...props}
      className={`TabButton px-12 py-2 ${active && activeClasses}  ${props.className}`}
    >
      {children}
    </button>
  );
}
