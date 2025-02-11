import React from 'react';

import { Stack, StackProps } from '@chakra-ui/react';

export function AcomodacaoListFeatures(props: StackProps) {
  return (
    <Stack
      direction={"row"}
      wrap={"wrap"}
      spacing={2}
      {...props}
      className={`Acomodacao__listFeatures ${props.className}`}
    >
      {props.children}
    </Stack>
  );
}
