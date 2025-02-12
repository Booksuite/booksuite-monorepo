import * as React from "react";
import { SVGProps } from "react";
const ListIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.375 7.5h11.25M6.375 12h11.25m-11.25 4.5h6.75M3 3h18v18H3V3Z"
    />
  </svg>
);
export default ListIcon;
