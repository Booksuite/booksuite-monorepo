import { SVGProps } from "react";
import * as React from "react";

const PersonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={12}
    fill="none"
    viewBox="0 0 13 12"
    {...props}
  >
    <path
      fill="#fff"
      d="M6.031 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM12.031 11c0 1-1 1-1 1h-10s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.547 8.68 8.32 8 6.031 8s-3.515.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664h10Z"
    />
  </svg>
);
export default PersonIcon;
