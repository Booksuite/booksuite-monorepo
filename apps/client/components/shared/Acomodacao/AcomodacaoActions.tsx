"use client";

import { Flex, type FlexProps } from "@chakra-ui/react";
import React from "react";

interface AcomodacaoActionsProps extends FlexProps {
  children: React.ReactNode;
}

export function AcomodacaoActions({ children, ...props }: AcomodacaoActionsProps) {
  return (
    <Flex marginTop={"auto"} {...props}>
      {children}
    </Flex>
  );
}
