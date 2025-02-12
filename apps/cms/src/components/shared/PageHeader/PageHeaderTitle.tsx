import * as React from "react";

export interface PageHeaderTitleProps {
  children: React.ReactNode;
}

export function PageHeaderTitle(props: PageHeaderTitleProps) {
  return <h1>{props.children}</h1>;
}
