import { Box, Radio, type BoxProps, type RadioProps } from "@chakra-ui/react";
import React, { type HtmlHTMLAttributes } from "react";

interface RadioItemProps extends RadioProps {
  children: React.ReactNode;
  boxProps?: BoxProps;
}

export function RadioItem({ children, boxProps, ...props }: RadioItemProps) {
  return (
    <Box className={"RadioItem"} {...boxProps}>
      <Radio padding={5} flexDirection={"row-reverse"} {...props}>
        {children}
      </Radio>
    </Box>
  );
}
