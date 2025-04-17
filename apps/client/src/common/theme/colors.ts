import { lighten, darken } from 'color2k'

export const baseColors = {
    blueGrey: {
        100: '#F0F4F8',
        200: '#D9E2EC',
        300: '#9FB3C8',
        400: '#627D98',
        500: '#486581',
        600: '#334E68',
        700: '#243B53',
        800: '#102A43',
        primary: '#243B53',
        secondary: '#486581',
    },
    coolGrey: {
        100: '#F5F7FA',
        200: '#E4E7EB',
        300: '#CBD2D9',
        400: '#9AA5B1',
        500: '#7B8794',
        600: '#616E7C',
        700: '#52606D',
        800: '#3E4C59',
        primary: '#52606D',
        secondary: '#7B8794',
    },
    grey: {
        100: '#F7F7F7',
        200: '#E1E1E1',
        300: '#CFCFCF',
        400: '#B1B1B1',
        500: '#9E9E9E',
        600: '#7E7E7E',
        700: '#626262',
        800: '#515151',
        primary: '#222222',
        secondary: '#626262',
    },
    warmGrey: {
        100: '#FAF9F7',
        200: '#E8E6E1',
        300: '#D3CEC4',
        400: '#B8B2A7',
        500: '#A39E93',
        600: '#857F72',
        700: '#625D52',
        800: '#504A40',
        primary: '#504A40',
        secondary: '#857F72',
    },
    systemColors: {
        blueLight: '#E5ECF6',
        blue: '#4D84FF',
        orange: '#ED774A',
        red: '#CC4444',
        green: '#4BA35F',
    },
} as const

type ColorScale = {
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
}

export type ColorPalette = typeof baseColors & {
    primary: string
    primaryScale: ColorScale
}

export const getColors = (
    companyPrimaryColor: string = '#000000',
): ColorPalette => ({
    ...baseColors,
    primary: companyPrimaryColor,
    primaryScale: generateColorVariations(companyPrimaryColor),
})

const generateColorVariations = (baseColor: string) => {
    return {
        100: lighten(baseColor, 0.4),
        200: lighten(baseColor, 0.3),
        300: lighten(baseColor, 0.2),
        400: lighten(baseColor, 0.1),
        500: baseColor,
        600: darken(baseColor, 0.1),
        700: darken(baseColor, 0.2),
        800: darken(baseColor, 0.3),
    }
}
