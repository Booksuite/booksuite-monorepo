import * as React from "react";
import { SVGProps } from "react";
const CheckSquareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    viewBox="0 0 50 50"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.375 45.313a4.688 4.688 0 0 1-4.688-4.688V9.375a4.687 4.687 0 0 1 4.688-4.688h25a1.563 1.563 0 0 1 0 3.125h-25c-.863 0-1.563.7-1.563 1.563v31.25c0 .863.7 1.563 1.563 1.563h31.25c.863 0 1.563-.7 1.563-1.563V25a1.563 1.563 0 0 1 3.124 0v15.625a4.688 4.688 0 0 1-4.687 4.688H9.375Z"
    />
    <path
      fill="currentColor"
      d="M26.105 32.355 47.98 10.48a1.563 1.563 0 0 0-2.21-2.21L25 29.04l-8.27-8.27a1.563 1.563 0 0 0-2.21 2.21l9.375 9.375c.61.61 1.6.61 2.21 0Z"
    />
  </svg>
);
export default CheckSquareIcon;
