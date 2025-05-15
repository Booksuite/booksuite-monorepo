import { createTheme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'

// Blue Grey color palette definition
const blueGrey = {
    50: '#F0F4F8',
    100: '#D9E2EC',
    200: '#BCCCDC',
    300: '#9FB3C8',
    400: '#829AB1',
    500: '#627D98',
    600: '#486581',
    700: '#334E68',
    800: '#243B53',
    900: '#102A43',
} as const

// Blue color palette definition
const blue = {
    50: '#E6F6FF',
    100: '#BAE3FF',
    200: '#7CC4FA',
    300: '#47A3F3',
    400: '#2186EB',
    500: '#0967D2',
    600: '#0552B5',
    700: '#03449E',
    800: '#01337D',
    900: '#002159',
} as const

// Orange color palette definition
const orange = {
    50: '#FFE8D9',
    100: '#FFD0B5',
    200: '#FFB088',
    300: '#FF9466',
    400: '#F9703E',
    500: '#F35627',
    600: '#DE3A11',
    700: '#C52707',
    800: '#AD1D07',
    900: '#841003',
} as const

// Type for our custom palette
declare module '@mui/material/styles' {
    interface Palette {
        blueGrey: typeof blueGrey
        blue: typeof blue
        orange: typeof orange
    }
    interface PaletteOptions {
        blueGrey?: typeof blueGrey
        blue?: typeof blue
        orange?: typeof orange
    }
}

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        text: {
            primary: blueGrey[900],
            disabled: blueGrey[200],
            secondary: blueGrey[500],
        },
        primary: {
            main: blue[600],
            light: blue[400],
            dark: blue[800],
            contrastText: '#ffffff',
        },
        secondary: {
            main: orange[500],
            light: orange[400],
            dark: orange[800],
            contrastText: '#ffffff',
        },
        blueGrey,
        blue,
        orange,
    },

    spacing: 4,
    shape: {
        borderRadius: 8,
    },

    typography: {
      
        fontFamily: 'var(--font-inter)',
        fontSize: 14,
        body2: {
            color: '#888',
        },
    },

    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'filled',
                fullWidth: true,
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    variants: [
                        {
                            props: {
                                variant: 'filled',
                            },

                            style: {
                                '& .MuiFilledInput-root': {
                                    borderRadius: theme.shape.borderRadius,
                                    border: `1px solid ${theme.palette.grey[400]}`,
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        borderColor: theme.palette.grey[900],
                                    },
                                    '&.Mui-error': {
                                        backgroundColor: 'white',
                                        borderColor: theme.palette.error.main,
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'white',
                                        outline: `2px inset ${theme.palette.primary.main}`,
                                        outlineOffset: -1,
                                    },
                                    ':after, :before': {
                                        content: 'none',
                                        borderBottom: 'none',
                                    },
                                },
                            },
                        },
                    ],
                }),
            },
        },
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
                style: {
                    borderRadius: "8px",
                },

            },
            styleOverrides: {
                root: {
                    px: 8,
                    textTransform: 'none',
                },
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
    },
}

export const theme = createTheme(themeOptions)
