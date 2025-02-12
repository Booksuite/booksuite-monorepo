import { SVGProps } from "react";

const OptionsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#001A72"
      style={{ fill: "currentcolor" }}
      d="M11.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM11.5 13.54a1.5 1.5 0 1 0 0-3.001 1.5 1.5 0 0 0 0 3ZM11.5 19.078a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
    />
  </svg>
);
export default OptionsIcon;
