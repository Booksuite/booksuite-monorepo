"use client";

import { Flex } from "@chakra-ui/react";
import * as React from "react";

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
