import { SVGProps } from "react";

const MoneyIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 16h1c.667 0 2-.4 2-2s-1.333-2-2-2h-2c-.667 0-2-.4-2-2s1.333-2 2-2h1m0 8H9m3 0v2m3-10h-3m0 0V6m9 6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
export default MoneyIcon;
