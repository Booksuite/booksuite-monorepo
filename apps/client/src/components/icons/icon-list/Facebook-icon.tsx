import React, { SVGProps } from "react";

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M19.071 3H4.93A1.929 1.929 0 0 0 3 4.929V19.07A1.928 1.928 0 0 0 4.929 21h5.514v-6.12H7.912V12h2.531V9.805c0-2.497 1.487-3.877 3.764-3.877 1.09 0 2.23.195 2.23.195v2.45h-1.256c-1.238 0-1.624.769-1.624 1.557V12h2.763l-.442 2.88h-2.321V21h5.514A1.928 1.928 0 0 0 21 19.071V4.93A1.928 1.928 0 0 0 19.071 3Z"
    />
  </svg>
);
export default FacebookIcon;
