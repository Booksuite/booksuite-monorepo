import * as React from "react";
import { SVGProps } from "react";
const HotelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 4v16c0 .943 0 1.414.293 1.707C3.586 22 4.057 22 5 22h14c.943 0 1.414 0 1.707-.293C21 21.414 21 20.943 21 20V4M10.5 8v1.5m0 0V11m0-1.5h3m0-1.5v1.5m0 0V11"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 22v-4a2 2 0 0 0-4 0v4M2 4h6c.64-1.173 2.19-2 4-2s3.36.827 4 2h6M6 8h1m-1 4h1m-1 4h1m10-8h1m-1 4h1m-1 4h1"
    />
  </svg>
);
export default HotelIcon;
