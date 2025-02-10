import { SVGProps } from 'react';

const CartIcon = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.3}
      d="M3 3h2.368l1.895 13.263h9.948m0 0a1.895 1.895 0 1 0 0 3.79 1.895 1.895 0 0 0 0-3.79ZM6.857 13.421h11.3L21 4.895H5.64m5.886 13.263a1.895 1.895 0 1 1-3.79 0 1.895 1.895 0 0 1 3.79 0Z"
    />
  </svg>
);
export default CartIcon;
