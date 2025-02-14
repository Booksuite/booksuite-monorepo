'use client'

import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { DashboadSidebar } from '../DashboadSidebar'
import { DashboardHeader } from '../DashboardHeader'
import { DashboardLayoutProps } from './types'

const avatarUrl = '/profile-pic.png'

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <Flex h="100vh">
            <DashboadSidebar isOpen={isSidebarOpen} />
            <Box flex={1} overflow="auto">
                <DashboardHeader
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
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
