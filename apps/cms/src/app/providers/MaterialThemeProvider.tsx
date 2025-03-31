import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { PropsWithChildren } from 'react'

import { theme } from '@/common/theme'

export const MaterialThemeProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
