'use client'

import { Box, Container } from '@mui/material'
import type React from 'react'

import { DashboardHeader } from './components/DashboardHeader'
import { DashboardSidebar } from './components/DashboardSidebar'
import { useDashboardSidebarStore } from './stores/dashboardSidebar'
import type { DashboardLayoutProps } from './types'

const avatarUrl = '/profile-pic.png'

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}) => {
    const { drawerWidth } = useDashboardSidebarStore()

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <DashboardSidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: `${drawerWidth}px`,
                    transition: 'margin 0.3s, width 0.3s',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
                    <DashboardHeader
                        userName="Admin Booksuite"
                        userImageSrc={avatarUrl}
                    />
                </Box>
                <Box
                    component="main"
                    sx={{
                        px: 20,
                        py: 15,
                        flex: 1,
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg">{children}</Container>
                </Box>
            </Box>
        </Box>
    )
}
