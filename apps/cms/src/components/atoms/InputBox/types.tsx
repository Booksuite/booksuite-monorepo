import { FormControlProps, InputProps } from '@chakra-ui/react'

export interface InputBoxProps extends InputProps {
    asText?: boolean
    formControl?: FormControlProps
    label?: string
    mask?: string
    onValueChange?: (value, name, values) => void
}
