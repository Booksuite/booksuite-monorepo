import * as React from "react";
import { SVGProps } from "react";
const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="currentColor"
      d="M17.183 2.183a.625.625 0 0 1 .884 0l3.75 3.75a.625.625 0 0 1 0 .884l-12.5 12.5a.625.625 0 0 1-.21.138l-6.25 2.5a.625.625 0 0 1-.812-.812l2.5-6.25a.626.626 0 0 1 .138-.21l12.5-12.5ZM16.01 5.125l2.866 2.866 1.616-1.616-2.866-2.866-1.616 1.616Zm1.982 3.75-2.866-2.866L7 14.134v.366h.625c.345 0 .625.28.625.625v.625h.625c.345 0 .625.28.625.625V17h.366l8.125-8.125ZM5.79 15.345l-.132.131-1.911 4.777 4.777-1.91.132-.133a.625.625 0 0 1-.406-.585V17h-.625A.625.625 0 0 1 7 16.375v-.625h-.625a.625.625 0 0 1-.585-.406Z"
    />
  </svg>
);
export default PencilIcon;
