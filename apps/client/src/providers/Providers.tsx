'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

import { CartProvider } from '@/common/hooks/useCart'

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
                <ThemeProvider>
                    <CartProvider>{children}</CartProvider>
                </ThemeProvider>
            </CompanyProvider>
        </QueryClientProvider>
    )
}
