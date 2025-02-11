import * as React from "react";
import { SVGProps } from "react";
const CutleryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m17.786 3-3.104 3.104a2.571 2.571 0 0 0-.754 1.818v.597a.644.644 0 0 1-.188.455l-.454.455m1.285 1.285.455-.454a.641.641 0 0 1 .455-.188h.597a2.572 2.572 0 0 0 1.818-.754L21 6.214m-1.607-1.607-3.215 3.215M9.75 16.5l-4.007 4.03a1.607 1.607 0 0 1-2.272-2.273l3.386-3.364M4.024 3.633l14.803 14.803a1.498 1.498 0 0 1-2.118 2.118l-3.616-3.678a1.286 1.286 0 0 1-.37-.902v-.222a1.284 1.284 0 0 0-.382-.915l-.467-.431a1.284 1.284 0 0 0-1.198-.3 1.95 1.95 0 0 1-1.87-.507l-3.433-3.433C3.337 8.13 2.588 5.056 4.024 3.632Z"
    />
  </svg>
);
export default CutleryIcon;
