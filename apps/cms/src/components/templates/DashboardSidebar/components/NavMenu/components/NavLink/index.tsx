import { Box, Flex, Text, Tooltip } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import type { NavLinkProps } from '../../types'

export const NavLink = ({
    href,
    children,
    isActive,
    isCollapsed,
    icon: Icon,
    isFooter,
}: NavLinkProps) => {
    const content = (
        <Flex
            as={NextLink}
            href={href}
            display="flex"
            py={2}
            px={isCollapsed ? 2 : 3}
            fontSize="sm"
            fontWeight="medium"
            color={'white'}
            alignItems="center"
            borderRadius="md"
            bg={isActive ? 'blue.500' : 'transparent'}
            _hover={{
                bg: isActive ? 'rgba(255, 255, 255, 0.1)' : 'whiteAlpha.100',
            }}
            transition="all 0.2s"
            textDecoration="none"
            justifyContent={isCollapsed ? 'center' : 'flex-start'}
            width="full"
            role="group"
            mx={0}
        >
            {Icon && (
                <Box mr={isCollapsed ? 0 : 2.5} color={'white'}>
                    {React.isValidElement(Icon) ? Icon : <Icon size={18} />}
                </Box>
            )}
            {!isCollapsed && <Text>{children}</Text>}
        </Flex>
    )

    if (isCollapsed) {
        return (
            <Tooltip
                label={children}
                placement="right"
                hasArrow
                bg="gray.800"
                color="white"
            >
                {content}
            </Tooltip>
        )
    }

    return content
}
