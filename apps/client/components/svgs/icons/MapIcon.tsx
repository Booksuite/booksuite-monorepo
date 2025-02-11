import * as React from "react";
import { SVGProps } from "react";
const MapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 3v16m0-16L9 5m6-2 6 2v16l-6-2m0 0-6 2M9 5v16M9 5 3 3v16l6 2"
    />
  </svg>
);
export default MapIcon;
