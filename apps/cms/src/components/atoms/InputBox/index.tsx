'use client'

import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
} from '@chakra-ui/react'
import CurrencyInput from 'react-currency-input-field'

export interface InputBoxProps extends InputProps {
    formControl?: FormControlProps
    error?: string
    label?: string
    mask?: string
}

export const InputBox: React.FC<InputBoxProps> = ({
    label,
    error,
    ...props
}) => {
    return (
        <FormControl isInvalid={!!error} {...props.formControl}>
            {props.type === 'currency' ? (
                <Input
                    as={CurrencyInput}
                    prefix={props.prefix ?? 'R$ '}
                    placeholder=" "
                    decimalsLimit={2}
                    decimalScale={2}
                    {...props}
                />
            ) : (
                <Input placeholder=" " {...props} />
            )}
            <FormLabel>{label}</FormLabel>
            <FormErrorMessage color="red.400">{error}</FormErrorMessage>
        </FormControl>
    )
}

export default InputBox
