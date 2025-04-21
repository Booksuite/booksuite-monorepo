'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

import { CompanyProvider } from './CompanyProvider'
import { ThemeProvider } from './ThemeProvider'

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <CompanyProvider>
                <ThemeProvider>{children}</ThemeProvider>
            </CompanyProvider>
        </QueryClientProvider>
    )
}
