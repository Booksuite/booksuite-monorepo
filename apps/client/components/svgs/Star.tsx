import React, { SVGProps } from "react";

export default function Star(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.81475 20L5.45551 12.6034L0 7.63052L7.18624 6.97619L10.0007 0L12.8151 6.9748L20 7.62912L14.5458 12.602L16.1866 19.9986L10.0007 16.0727L3.81475 20Z"
        fill="#FFAB07"
      />
    </svg>
  );
}
