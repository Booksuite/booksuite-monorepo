import { createTheme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
    },
    shape: {
        borderRadius: 8,
    },

    typography: {
        fontFamily: 'var(--font-inter)',
    },

    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
                color: 'transparent',
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }),
            },
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained',
                size: 'small',
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    px: 8,
                    textTransform: 'none',
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiPagination: {
            defaultProps: { shape: 'rounded', variant: 'outlined' },
            styleOverrides: {
                root: ({ theme }) => ({
                    '& .Mui-selected': {
                        backgroundColor: `${theme.palette.primary.dark} !important`,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                        },
                    },
                }),
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
        },
    },
}

export const theme = createTheme(themeOptions)
