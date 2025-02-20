import { FlexProps, SwitchProps } from '@chakra-ui/react'

export interface SwitchBoxProps extends SwitchProps {
    label?: string
    htmlFor?: string
    flexProps?: FlexProps
}
