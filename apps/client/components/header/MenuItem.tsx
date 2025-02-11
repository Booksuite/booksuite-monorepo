import React from "react";
import Link from "next/link";

import { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps extends LinkProps {
  children?: React.ReactNode;
  className?: string;
}

export function MenuItem(props: MenuItemProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={`${pathname == props.href ? "font-bold" : ""} ${
        props.className
      }`}
    >
      {props.children}
    </Link>
  );
}
