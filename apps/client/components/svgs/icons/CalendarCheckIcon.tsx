import * as React from "react";
import { SVGProps } from "react";
const CalendarCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.923 4.385H5.077C3.93 4.385 3 5.315 3 6.462v12.461C3 20.07 3.93 21 5.077 21h13.846C20.07 21 21 20.07 21 18.923V6.462c0-1.147-.93-2.077-2.077-2.077Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.46 3v1.385M17.539 3v1.385"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 7.846H3"
    />
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.2}
      d="m15.95 11.806-.072-.07.072.07a.54.54 0 0 0 0-.749l-.072.07.072-.07a.51.51 0 0 0-.733 0l-4.056 4.199-1.378-1.428a.51.51 0 0 0-.733 0 .54.54 0 0 0 0 .75l1.746 1.81c.203.209.531.209.734 0l4.42-4.582Z"
    />
  </svg>
);
export default CalendarCheckIcon;
