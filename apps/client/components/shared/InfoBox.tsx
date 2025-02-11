import { Flex, type FlexProps } from "@chakra-ui/react";
import React from "react";

interface InfoBoxProps extends FlexProps {
  color?: string;
}

export function InfoBox({ color, children, ...props }: InfoBoxProps) {
  return (
    <Flex
      style={{ "--color": color } as React.CSSProperties}
      width={"100%"}
      textAlign={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      {...props}
      className={`InfoBox ${props.className}`}
    >
      {children}
    </Flex>
  );
}
