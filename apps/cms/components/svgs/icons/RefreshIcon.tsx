import * as React from "react";
import { SVGProps } from "react";
const RefreshIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.748 5.961a7.29 7.29 0 1 0 6.628 4.25.73.73 0 0 1 1.325-.61 8.748 8.748 0 1 1-7.953-5.098v1.458Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M11.748 8.1V2.364c0-.309.36-.478.598-.28l3.44 2.867a.364.364 0 0 1 0 .56l-3.44 2.867a.365.365 0 0 1-.598-.28Z"
    />
  </svg>
);
export default RefreshIcon;
