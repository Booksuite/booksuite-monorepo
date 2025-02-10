const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#001A72"
      style={{ stroke: "currentcolor" }}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="m8.666 17 5.333-5-5.333-5"
    />
  </svg>
);
export default ChevronRightIcon;
