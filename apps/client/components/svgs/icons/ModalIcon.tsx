import * as React from "react";
import { SVGProps } from "react";
const ModalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3 21h13.5a1.504 1.504 0 0 0 1.5-1.5V9a1.504 1.504 0 0 0-1.5-1.5H3A1.505 1.505 0 0 0 1.5 9v10.5A1.504 1.504 0 0 0 3 21ZM3 9h13.5v10.5H3V9Z"
    />
    <path
      fill="currentColor"
      d="M10.5 4.5H21V12h-1.5v1.5H21a1.504 1.504 0 0 0 1.5-1.5V4.5A1.504 1.504 0 0 0 21 3H10.5A1.504 1.504 0 0 0 9 4.5V6h1.5V4.5Z"
    />
  </svg>
);
export default ModalIcon;
