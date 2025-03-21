'use client'

import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { CurrencyInput } from 'react-currency-mask'

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
                <CurrencyInput
                    value={Number(props.value)}
                    InputElement={<Input placeholder=" " />}
                    onChangeValue={(_, value) => {
                        props.onChange?.({
                            currentTarget: { value },
                            target: { value },
                        } as ChangeEvent<HTMLInputElement>)
                    }}
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
