"use client";

import { Flex } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { SimpleFilterItem } from "./SimpleFilterItem";

export interface SimpleFilterItemsType {
  label: string;
  checked?: boolean;
}

export interface SimpleFilterProps {
  items: Array<SimpleFilterItemsType>;
  name: string;
  className?: string;
  onChange?: Function;
}

export function SimpleFilter({ ...props }: SimpleFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);
  if (props.items.length > 0) {
    params.set("filter", props.items.find((el) => el.checked).label);
  } else {
    params.delete("filter");
  }

  function handleChange(e: any) {
    const inputs = document.querySelectorAll(`.SimpleFilter input[name=${props.name}]:checked`);

    let checkeds = [];

    if (inputs.length > 0) {
      inputs.forEach((item: any) => {
        checkeds.push(item.value);
      });
    }

    const params = new URLSearchParams(searchParams);
    if (checkeds.length > 0) {
      params.set("filter", checkeds[0]);
    } else {
      params.delete("filter");
    }
    router.push(`${pathname}?${params.toString().toLowerCase()}`);
  }

  return (
    <Flex
      className={`SimpleFilter w-full overflow-x-auto no-scrollbar ${props.className}`}
      direction="row"
      gap={2}
    >
      {props.items.map((item: SimpleFilterItemsType, index: number) => (
        <SimpleFilterItem
          key={`${props.name} - ${index}`}
          type={"radio"}
          labelFor={item.label}
          name={props.name}
          defaultChecked={item.checked}
          onChange={handleChange}
        >
          {item.label}
        </SimpleFilterItem>
      ))}
    </Flex>
  );
}
