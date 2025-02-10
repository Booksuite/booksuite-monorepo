import * as React from "react";
import { SVGProps } from "react";
const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={19} fill="none" {...props}>
    <path
      fill="currentColor"
      d="m13.366 15.416.464-9.812h.672a.508.508 0 0 0 0-1.014h-2.939V3.584c0-.96-.652-1.584-1.687-1.584H7.36c-1.036 0-1.682.624-1.682 1.584V4.59H2.754a.518.518 0 0 0-.504.51c0 .276.235.504.504.504h.673l.464 9.819C3.938 16.39 4.576 17 5.545 17h6.167c.961 0 1.607-.618 1.654-1.584ZM6.756 3.651c0-.383.282-.651.685-.651h2.36c.411 0 .693.268.693.65v.94H6.755v-.94Zm-1.11 12.342c-.39 0-.68-.295-.7-.684l-.47-9.705h8.278l-.444 9.705c-.02.396-.303.684-.7.684H5.647Z"
    />
  </svg>
);
export default TrashIcon;
