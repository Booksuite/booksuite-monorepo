'use client'

import { Box, Container, Stack } from '@mui/material'
import type React from 'react'
import { useState } from 'react'

import { DashboardHeader } from '../DashboardHeader'
import { DashboardSidebar } from '../DashboardSidebar'

import type { DashboardLayoutProps } from './types'

const avatarUrl = '/profile-pic.png'

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <Stack height="100vh" flexDirection={{ xs: 'column', md: 'row' }}>
            <DashboardSidebar
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                userImageSrc={''}
            />
            <Box flex={1} overflow="auto">
                <DashboardHeader
                    onToggleSidebar={() => setIsOpen(!isOpen)}
                    userName="Admin Booksuite"
                    userImageSrc={avatarUrl}
                />
                <Box py={{ xs: 4, md: 6, lg: 8 }} px={{ xs: 10, md: 20 }}>
                    <Container component="main" disableGutters fixed>
                        {children}
                    </Container>
                </Box>
            </Box>
        </Stack>
    )
}
