import * as React from "react";
import { SVGProps } from "react";
const ChildrenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="currentColor"
      d="M8.625 13.125a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm6.75-2.25a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm-1.15 4.24a4.219 4.219 0 0 1-4.45 0 .75.75 0 0 0-.8 1.27 5.719 5.719 0 0 0 6.05 0 .75.75 0 0 0-.8-1.27ZM21.75 12A9.75 9.75 0 1 1 12 2.25 9.76 9.76 0 0 1 21.75 12Zm-1.5 0a8.26 8.26 0 0 0-7.883-8.242C11.28 5.286 11.25 6.738 11.25 6.75a.75.75 0 1 0 1.5 0 .75.75 0 1 1 1.5 0 2.25 2.25 0 1 1-4.5 0c0-.068.012-1.34.793-2.872A8.25 8.25 0 1 0 20.25 12Z"
    />
  </svg>
);
export default ChildrenIcon;
