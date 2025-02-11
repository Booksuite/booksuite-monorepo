import * as React from "react";

const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M4.027 18.329A2 2 0 0 0 6 20h12a2 2 0 0 0 2-2v-3.81M4.027 18.33A2.014 2.014 0 0 1 4 18V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8.19M4.027 18.33l3.82-3.82a2 2 0 0 1 2.427-.16l.51.34a2 2 0 0 0 2.358-.103l2.648-2.118a2 2 0 0 1 2.333-.12c.08.052.15.115.217.182L20 14.19M11 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </svg>
);
export default ImageIcon;
