import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

interface FeatureProps extends FlexProps {
  icon?: React.ReactNode;
}

export default function Feature(props: FeatureProps) {
  return (
    <Flex
      alignItems={"center"}
      direction={"column"}
      gap={2}
      {...props}
      className={`Feature text-center ${props.className}`}
    >
      {props.icon}
      {props.children}
    </Flex>
  );
}
