import { SVGProps } from "react";

const DiscountIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#102A43"
      style={{ stroke: "currentcolor" }}
      strokeWidth={1.5}
      d="M10.345 2.74a2.221 2.221 0 0 1 3.31 0l.778.868a2.223 2.223 0 0 0 1.779.737l1.166-.064a2.222 2.222 0 0 1 2.34 2.341l-.064 1.166a2.222 2.222 0 0 0 .737 1.777l.869.778a2.221 2.221 0 0 1 0 3.312l-.87.777a2.222 2.222 0 0 0-.736 1.779l.065 1.166a2.22 2.22 0 0 1-2.342 2.341l-1.165-.064a2.222 2.222 0 0 0-1.778.736l-.778.869a2.223 2.223 0 0 1-3.311 0l-.778-.869a2.222 2.222 0 0 0-1.779-.736l-1.166.064a2.222 2.222 0 0 1-2.34-2.342l.064-1.165a2.222 2.222 0 0 0-.737-1.778l-.869-.777a2.221 2.221 0 0 1 0-3.312l.87-.778a2.222 2.222 0 0 0 .736-1.778L4.28 6.62a2.222 2.222 0 0 1 2.342-2.34l1.165.065a2.222 2.222 0 0 0 1.778-.736l.779-.87Z"
    />
    <path
      style={{ stroke: "currentcolor" }}
      stroke="#102A43"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="M9.222 9.223h.01v.01h-.01v-.01Zm5.554 5.554h.011v.011h-.01v-.01Z"
    />
    <path
      style={{ stroke: "currentcolor" }}
      stroke="#102A43"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m15.333 8.668-6.666 6.666"
    />
  </svg>
);
export default DiscountIcon;
