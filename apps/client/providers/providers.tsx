'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import CartContextProvider from '@/contexts/cartContext'

import ChakraThemeProvider from './chakraThemeProvider'
import { CompanyProvider } from './companyProvider'
import CssCacheProvider from './cssCacheProvider'

interface ProvidersProps {
    children: React.ReactNode
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            refetchOnMount: false,
            refetchInterval: false,
        },
    },
})

export function Providers({ children }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <CartContextProvider>
                <ChakraThemeProvider>
                    <CssCacheProvider>
                        <CompanyProvider>{children}</CompanyProvider>
                    </CssCacheProvider>
                </ChakraThemeProvider>
            </CartContextProvider>
        </QueryClientProvider>
    )
}
