import { Tag, type TagProps } from "@chakra-ui/react";
import React from "react";

interface SmartSearchTagProps extends TagProps {
  children?: React.ReactNode;
}

export default function SmartSearchTag({ children, ...props }: SmartSearchTagProps) {
  return (
    <Tag
      className="bg-opacity bg-opacity--10 before:rounded-[0.75rem]"
      paddingBlock={2}
      paddingInline={4}
      fontWeight={500}
      fontSize={13}
      {...props}
    >
      {children}
    </Tag>
  );
}
