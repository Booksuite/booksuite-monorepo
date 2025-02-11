"use client";

import * as React from "react";

import { Flex } from "@chakra-ui/react";

export interface PageHeaderRootProps {
  children: React.ReactNode;
}

export function PageHeaderRoot(props: PageHeaderRootProps) {
  return (
    <Flex className="PageHeader" direction="column" gap={2}>
      {props.children}
    </Flex>
  );
}
