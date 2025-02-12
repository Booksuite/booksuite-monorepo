import * as React from "react";
import { SVGProps } from "react";
const FileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="currentColor"
      d="M19 7.625V19.5a2.5 2.5 0 0 1-2.5 2.5h-10A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2h6.875L19 7.625Zm-3.75 0a1.875 1.875 0 0 1-1.875-1.875v-2.5H6.5c-.69 0-1.25.56-1.25 1.25v15c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25V7.625h-2.5Z"
    />
  </svg>
);
export default FileIcon;
