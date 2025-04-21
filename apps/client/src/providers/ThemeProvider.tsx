import { darken,lighten } from 'color2k'
import React, { createContext, useContext, useEffect } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { ColorPalette, getColors } from '@/common/theme/colors'

interface ThemeContextType {
    colors: ColorPalette
    updateTheme: (newPrimaryColor: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const generateColorScale = (baseColor: string) => {
    return {
        100: lighten(baseColor, 0.4),
        200: lighten(baseColor, 0.3),
        300: lighten(baseColor, 0.2),
        400: lighten(baseColor, 0.1),
        500: baseColor,
        600: darken(baseColor, 0.1),
        700: darken(baseColor, 0.2),
        800: darken(baseColor, 0.3),
        900: darken(baseColor, 0.4),
    }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { company } = useCurrentCompanyStore()
    const primaryColor = company?.settings?.theme?.color || '#000000'

    const updateTheme = (newPrimaryColor: string) => {
        const colorScale = generateColorScale(newPrimaryColor)

        document.documentElement.style.setProperty(
            '--primary-color',
            newPrimaryColor,
        )

        Object.entries(colorScale).forEach(([scale, color]) => {
            document.documentElement.style.setProperty(
                `--primary-${scale}`,
                color,
            )
        })
    }

    useEffect(() => {
        updateTheme(primaryColor)
    }, [primaryColor])

    const value = {
        colors: getColors(primaryColor),
        updateTheme,
    }

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
