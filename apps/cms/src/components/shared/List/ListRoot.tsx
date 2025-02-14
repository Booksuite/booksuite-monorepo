import { Stack } from "@chakra-ui/react";
import React from "react";

interface ListRootProps {
  children: React.ReactNode;
}

export function ListRoot(props: ListRootProps) {
  return (
    <Stack spacing={"0.625rem"} className="List">
      {props.children}
    </Stack>
  );
}
