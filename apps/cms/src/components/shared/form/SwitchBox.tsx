"use client";

import React from "react";

import { Flex, FlexProps, FormLabel, Switch, SwitchProps } from "@chakra-ui/react";

interface SwitchBoxProps extends SwitchProps {
  label?: string;
  htmlFor?: string;
  flexProps?: FlexProps;
}

export function SwitchBox({ flexProps, ...props }: SwitchBoxProps) {
  return (
    <Flex alignItems="center" gap={2} {...flexProps}>
      {props.label && (
        <FormLabel htmlFor={props.id} m="0" width={"full"}>
          {props.label}
        </FormLabel>
      )}
      <Switch {...props} />
    </Flex>
  );
}
