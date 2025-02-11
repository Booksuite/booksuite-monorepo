import * as React from "react";
import { SVGProps } from "react";
const TvIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.392 2.54a.65.65 0 0 1 .92 0l2.69 2.69 2.69-2.69a.65.65 0 0 1 .92.92L12.67 6.4h6.53a2.45 2.45 0 0 1 2.45 2.45v9.9a2.45 2.45 0 0 1-2.45 2.45h-14.4a2.45 2.45 0 0 1-2.45-2.45v-9.9a2.45 2.45 0 0 1 2.45-2.45h6.531l-2.94-2.94a.65.65 0 0 1 0-.92ZM4.802 7.7a1.15 1.15 0 0 0-1.15 1.15v9.9a1.15 1.15 0 0 0 1.15 1.15h14.4a1.15 1.15 0 0 0 1.15-1.15v-9.9a1.15 1.15 0 0 0-1.15-1.15h-14.4Z"
      clipRule="evenodd"
    />
  </svg>
);
export default TvIcon;
