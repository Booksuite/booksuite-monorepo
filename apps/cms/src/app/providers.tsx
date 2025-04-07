'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Session } from 'next-auth'
import { SnackbarProvider } from 'notistack'

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
                        <SnackbarProvider
                            maxSnack={3}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            autoHideDuration={3000}
                            style={{ zIndex: 13000 }}
                        >
                            <SidebarProvider>
                                {children}
                                <ConfirmationDialog />
                            </SidebarProvider>
                        </SnackbarProvider>
                    </TanstackQueryProvider>
                </MaterialThemeProvider>
            </ChakraThemeProvider>
        </AppRouterCacheProvider>
    )
}
