import React from 'react';

import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

export default function Button(props: ButtonProps) {
  return <ChakraButton {...props}>{props.children}</ChakraButton>;
}
