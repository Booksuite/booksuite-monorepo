import NextLink from "next/link";

import { Flex, Link, LinkProps } from "@chakra-ui/react";

import { InternalMenu } from ".";

interface InternalMenuButtonProps extends LinkProps {
  children: React.ReactNode;
}

export function InternalMenuButton(props: InternalMenuButtonProps) {
  return (
    <Link className="InternalMenu__Button" as={NextLink} {...props}>
      <Flex alignItems="center" gap={2} justifyContent="space-between">
        <Flex alignItems="center" gap={2}>
          {props.children}
        </Flex>
        <InternalMenu.After />
      </Flex>
    </Link>
  );
}
