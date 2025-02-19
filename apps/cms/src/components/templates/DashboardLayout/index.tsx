'use client'

import type React from 'react'

import { Box, Flex, useDisclosure } from '@chakra-ui/react'

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
                <Box as="main" p={6}>
                    {children}
                </Box>
            </Box>
        </Flex>
    )
}
