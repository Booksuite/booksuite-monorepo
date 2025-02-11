import * as React from "react";
import { SVGProps } from "react";
const DisabledIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none" {...props}>
    <path
      fill="currentColor"
      d="M20 0a20 20 0 1 1 0 40 20 20 0 0 1 0-40Zm0 3.333A16.667 16.667 0 0 0 3.333 20c0 4 1.417 7.667 3.767 10.55L30.55 7.1A16.667 16.667 0 0 0 20 3.333Zm0 33.334A16.667 16.667 0 0 0 32.9 9.45L9.45 32.9A16.666 16.666 0 0 0 20 36.667Z"
    />
  </svg>
);
export default DisabledIcon;
