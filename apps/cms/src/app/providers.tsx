'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Session } from 'next-auth'

import { ConfirmationDialog } from '@/components/templates/ConfirmationDialog'

import ChakraThemeProvider from './providers/chakraThemeProvider'
import { MaterialThemeProvider } from './providers/MaterialThemeProvider'
import { SidebarProvider } from './providers/sidebarProvider'
import TanstackQueryProvider from './providers/tanstackQueryProvider'

interface ProvidersProps {
    children: React.ReactNode
    session?: Session
}

export function Providers({ children }: ProvidersProps) {
    return (
        <AppRouterCacheProvider>
            <ChakraThemeProvider>
                <MaterialThemeProvider>
                    <TanstackQueryProvider>
                        <SidebarProvider>
                            {children}
                            <ConfirmationDialog />
                        </SidebarProvider>
                    </TanstackQueryProvider>
                </MaterialThemeProvider>
            </ChakraThemeProvider>
        </AppRouterCacheProvider>
    )
}
