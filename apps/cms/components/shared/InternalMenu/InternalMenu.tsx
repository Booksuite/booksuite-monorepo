import { Flex } from "@chakra-ui/react";

interface InternalMenuRootProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  target?: string;
}

export function InternalMenuRoot({
  children,
  target = "_blank",
  ...props
}: InternalMenuRootProps) {
  return (
    <nav className={`InternalMenu ${props.className}`}>
      <Flex direction="column" gap={2}>
        {children}
      </Flex>
    </nav>
  );
}
