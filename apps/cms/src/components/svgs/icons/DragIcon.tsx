import { SVGProps } from "react";

const DragIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#001A72"
      style={{ fill: "currentcolor" }}
      d="M5 3h2v2H5V3Zm4 0h2v2H9V3ZM5 7h2v2H5V7Zm4 0h2v2H9V7Zm-4 4h2v2H5v-2Zm4 0h2v2H9v-2Zm-4 4h2v2H5v-2Zm4 0h2v2H9v-2Zm-4 4h2v2H5v-2Zm4 0h2v2H9v-2Z"
    />
  </svg>
);
export default DragIcon;
