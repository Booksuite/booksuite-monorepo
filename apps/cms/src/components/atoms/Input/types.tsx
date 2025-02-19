import {
    CheckboxProps,
    FlexProps,
    FormControlProps,
    InputProps,
    NumberInputProps,
    SwitchProps,
    TextareaProps,
} from '@chakra-ui/react'

export interface InputBoxProps extends InputProps {
    asText?: boolean
    formControl?: FormControlProps
    label?: string
    mask?: string
    onValueChange?: (value, name, values) => void
}

export interface Props extends CheckboxProps {
    children?: React.ReactNode
}

export interface InputNumberBoxProps extends NumberInputProps {
    label?: string | React.ReactNode
}

export interface DateProps {
    name?: string
    defaultValue?: string
}

export interface DateRangeBoxProps extends InputProps {
    inputText?: string
    label?: string
    startDateProps?: DateProps
    endDateProps?: DateProps
    asSingleDate?: boolean
    singleDateValue?: string
}

export interface SwitchBoxProps extends SwitchProps {
    label?: string
    htmlFor?: string
    flexProps?: FlexProps
}

export interface TextAreaBoxProps extends TextareaProps {
    label?: string
}
