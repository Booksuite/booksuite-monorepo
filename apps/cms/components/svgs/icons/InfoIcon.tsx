import * as React from "react";
import { SVGProps } from "react";
const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.25 10.5H12v6.75h.75m9-5.25a9.75 9.75 0 1 1-19.5 0 9.75 9.75 0 0 1 19.5 0Z"
    />
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.75}
      d="M12.75 7.125a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
export default InfoIcon;
