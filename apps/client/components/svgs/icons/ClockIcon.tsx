import * as React from "react";
import { SVGProps } from "react";
const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none" {...props}>
    <path
      fill="currentColor"
      d="M20 8.75a1.25 1.25 0 1 0-2.5 0V22.5c0 .449.24.863.63 1.085l8.75 5a1.25 1.25 0 0 0 1.24-2.17L20 21.775V8.75Z"
    />
    <path
      fill="currentColor"
      d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Zm17.5-20c0 9.665-7.835 17.5-17.5 17.5S2.5 29.665 2.5 20 10.335 2.5 20 2.5 37.5 10.335 37.5 20Z"
    />
  </svg>
);
export default ClockIcon;
