import * as React from "react";
import { SVGProps } from "react";
const ShareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={1.3}
      d="M11.444 15A2.222 2.222 0 1 1 7 15a2.222 2.222 0 0 1 4.444 0Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.3}
      d="m15.89 10.111-4.445 3.111m4.445 6.667-4.445-3.111"
    />
    <path
      stroke="currentColor"
      strokeWidth={1.3}
      d="M20.333 20.778a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0Zm0-11.556a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0Z"
    />
  </svg>
);
export default ShareIcon;
