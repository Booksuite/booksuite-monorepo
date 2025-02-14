'use client'

import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { SideBar } from '../SideBar'
import { TopBar } from '../TopBar'
import { HeaderLayoutProps } from './types'

export const HeaderLayout = ({ children }: HeaderLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <Flex h="100vh">
            <SideBar isOpen={isSidebarOpen} />
            <Box flex={1} overflow="auto">
                <TopBar
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    userName="Admin Booksuite"
                    userImageSrc="/profile-pic.png"
                />
                <Box as="main" p={6}>
                    {children}
                </Box>
            </Box>
        </Flex>
    )
}
