import * as React from "react";

export interface SimpleFilterItemProps
  extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  name?: string;
  labelFor?: string;
  type?: string;
}

export function SimpleFilterItem(props: SimpleFilterItemProps) {
  return (
    <>
      <label
        className={`SimpleFilterItem ${props.className} `}
        htmlFor={props.labelFor}
      >
        <input
          className="hidden"
          type={props.type}
          name={props.name}
          id={props.labelFor}
          value={props.labelFor}
          defaultChecked={props.defaultChecked}
          onChange={props.onChange}
        />

        {props.children}
      </label>
    </>
  );
}
