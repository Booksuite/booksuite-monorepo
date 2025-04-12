'use client'

import { Box, Container } from '@mui/material'
import type React from 'react'
import { useState } from 'react'

import { DashboardHeader } from '../DashboardHeader'
import { DashboardSidebar } from '../DashboardSidebar'

import type { DashboardLayoutProps } from './types'

const avatarUrl = '/profile-pic.png'

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <DashboardSidebar
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                userImageSrc={''}
                isCollapsed={isCollapsed}
                onToggleCollapse={handleToggleCollapse}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${isCollapsed ? 80 : 280}px)` },
                    transition: 'margin 0.3s, width 0.3s',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
                    <DashboardHeader
                        onToggleSidebar={handleToggleCollapse}
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
