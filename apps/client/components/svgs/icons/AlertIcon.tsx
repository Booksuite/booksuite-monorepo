import * as React from "react";
import { SVGProps } from "react";
const AlertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 12.25H1.5V1.75H12m0-1.5H1.5A1.5 1.5 0 0 0 0 1.75v10.5a1.5 1.5 0 0 0 1.5 1.5H12a1.5 1.5 0 0 0 1.5-1.5V1.75A1.5 1.5 0 0 0 12 .25Zm-6 9h1.5v1.5H6v-1.5Zm0-6h1.5v4.5H6v-4.5Z"
    />
  </svg>
);
export default AlertIcon;
