import * as React from "react";
import { SVGProps } from "react";
const DocumentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 13h6m-6 4h8M13 3H5v18h14V9m-6-6h1l5 5v1m-6-6v4c0 1 1 2 2 2h4"
    />
  </svg>
);
export default DocumentIcon;
