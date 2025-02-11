import { SVGProps } from 'react';

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m21 21-4.444-4.444m2.326-5.615a7.941 7.941 0 1 0-15.882 0 7.941 7.941 0 0 0 15.882 0Z"
    />
  </svg>
);
export default SearchIcon;
