import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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

interface TanstackQueryProviderProps {
    children: React.ReactNode
}

export default function TanstackQueryProvider(
    props: TanstackQueryProviderProps,
) {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
