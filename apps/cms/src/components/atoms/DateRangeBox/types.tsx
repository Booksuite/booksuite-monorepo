import { InputProps } from '@chakra-ui/react'

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
