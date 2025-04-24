'use client'

import '@/common/utils/dayjs'
import '@/common/utils/pluralize'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Session } from 'next-auth'
import { SnackbarProvider } from 'notistack'

import { ConfirmationDialog } from '@/components/templates/ConfirmationDialog'

import { MaterialThemeProvider } from './providers/MaterialThemeProvider'
import TanstackQueryProvider from './providers/tanstackQueryProvider'

interface ProvidersProps {
    children: React.ReactNode
    session?: Session
}

export function Providers({ children }: ProvidersProps) {
    return (
        <AppRouterCacheProvider>
            <MaterialThemeProvider>
                <TanstackQueryProvider>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="pt-BR"
                        dateFormats={{ weekdayShort: 'ddd' }}
                    >
                        <SnackbarProvider
                            maxSnack={3}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            autoHideDuration={3000}
                            style={{ zIndex: 13000 }}
                        >
                            {children}
                            <ConfirmationDialog />
                        </SnackbarProvider>
                    </LocalizationProvider>
                </TanstackQueryProvider>
            </MaterialThemeProvider>
        </AppRouterCacheProvider>
    )
}
