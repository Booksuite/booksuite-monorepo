import React from "react";

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#001A72"
      style={{ stroke: "currentcolor" }}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m4 10 8-7 8 7v10h-5v-4a3 3 0 0 0-6 0v4H4V10Z"
    />
  </svg>
);
export default HomeIcon;
