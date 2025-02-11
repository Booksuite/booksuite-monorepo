import { Box, type BoxProps } from "@chakra-ui/react";
import React from "react";

interface ContentBoxProps extends BoxProps {
  children: React.ReactNode;
}

export default function ContentBox({ children, ...props }: ContentBoxProps) {
  return (
    <Box
      bg={"white"}
      borderRadius={8}
      p={6}
      {...props}
      className={`border text-[0.9375rem] ${props.className}`}
    >
      {children}
    </Box>
  );
}
