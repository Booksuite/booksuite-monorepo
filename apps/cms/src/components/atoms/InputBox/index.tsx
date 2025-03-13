'use client'

import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { ElementType, useState } from 'react'
import InputMask from 'react-input-mask'

import { InputBoxProps } from './types'

function InputBox({ asText = false, onValueChange, ...props }: InputBoxProps) {
    const [inputHiddenValue, setInputHiddenValue] = useState(
        props.defaultValue ?? '',
    )

    return (
        <FormControl
            {...props.formControl}
            className={`InputBox ${props.formControl?.className}`}
        >
            {asText === false && (
                <input
                    type="hidden"
                    name={props.name}
                    value={inputHiddenValue}
                />
            )}

            <Input
                as={
                    props?.mask
                        ? (InputMask as unknown as ElementType)
                        : undefined
                }
                value={inputHiddenValue}
                onChange={(e) => {
                    const value = e.target.value
                    setInputHiddenValue(value)
                    onValueChange(value, props.name, {})
                }}
                {...props}
                name={asText ? props.name : ''}
            />

            <FormLabel>{props.label}</FormLabel>
        </FormControl>
    )
}

export default InputBox
