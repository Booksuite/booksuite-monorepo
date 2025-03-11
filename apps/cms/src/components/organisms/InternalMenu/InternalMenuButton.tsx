import { Flex, Link } from '@chakra-ui/react'
import { ChevronRight } from 'lucide-react'
import type { Route } from 'next'
import NextLink, { LinkProps } from 'next/link'

interface InternalMenuButtonProps extends LinkProps<Route> {
    icon: React.ReactNode
    title: string
}

export const InternalMenuButton: React.FC<InternalMenuButtonProps> = ({
    icon,
    title,
    ...props
}) => {
    return (
        // @ts-expect-error
        <Link as={NextLink} {...props}>
            <Flex
                alignItems="center"
                gap={2}
                justifyContent="space-between"
                bg="gray.100"
                px={3}
                py={4}
                borderRadius={16}
                _hover={{ bg: 'gray.200' }}
            >
                <Flex alignItems="center" gap={2}>
                    {icon}
                    {title}
                </Flex>

                <ChevronRight />
            </Flex>
        </Link>
    )
}
