'use client'

import { Session } from 'next-auth'

import { ConfirmationDialog } from '@/components/templates/ConfirmationDialog'

import ChakraThemeProvider from './providers/chakraThemeProvider'
import CssCacheProvider from './providers/cssCacheProvider'
import { SidebarProvider } from './providers/sidebarProvider'
import TanstackQueryProvider from './providers/tanstackQueryProvider'

interface ProvidersProps {
    children: React.ReactNode
    session?: Session
}

export function Providers({ children }: ProvidersProps) {
    return (
        <CssCacheProvider>
            <ChakraThemeProvider>
                <TanstackQueryProvider>
                    <SidebarProvider>
                        {children}
                        <ConfirmationDialog />
                    </SidebarProvider>
                </TanstackQueryProvider>
            </ChakraThemeProvider>
        </CssCacheProvider>
    )
}
