'use client'

import { Box, Container, Flex, useDisclosure } from '@chakra-ui/react'
import type React from 'react'

import { DashboardHeader } from '../DashboardHeader'
import { DashboardSidebar } from '../DashboardSidebar'

import type { DashboardLayoutProps } from './types'

const avatarUrl = '/profile-pic.png'

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}) => {
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

    return (
        <Flex h="100vh" flexDirection={{ base: 'column', md: 'row' }}>
            <DashboardSidebar
                isOpen={isOpen}
                onClose={onToggle}
                userImageSrc={''}
            />
            <Box flex={1} overflow="auto">
                <DashboardHeader
                    onToggleSidebar={onToggle}
                    userName="Admin Booksuite"
                    userImageSrc={avatarUrl}
                />
                <Container
                    as="main"
                    maxW={{
                        base: 'full',
                        lg: 'container.md',
                        xl: 'container.lg',
                        '2xl': 'container.xl',
                    }}
                    p={{ base: 10, xl: 16 }}
                >
                    {children}
                </Container>
            </Box>
        </Flex>
    )
}
