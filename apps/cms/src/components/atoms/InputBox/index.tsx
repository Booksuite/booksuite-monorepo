'use client'

import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { ElementType, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import InputMask from 'react-input-mask'
import { InputBoxProps } from './types'

function InputBox({ asText = false, onValueChange, ...props }: InputBoxProps) {
    const [inputHiddenValue, setInputHiddenValue] = useState(
        props.defaultValue ?? undefined,
    )

    return (
        <FormControl
            {...props.formControl}
            className={`InputBox ${props.formControl?.className}`}
        >
            {props.type === 'currency' ? (
                <>
                    {asText === false && (
                        <input
                            type="hidden"
                            name={props.name}
                            value={inputHiddenValue}
                        />
                    )}
                    <Input
                        as={CurrencyInput}
                        prefix={props.prefix ?? 'R$ '}
                        placeholder=" "
                        decimalsLimit={2}
                        decimalScale={2}
                        onValueChange={(value, name, values) => {
                            setInputHiddenValue(values.float)
                            onValueChange(value, name, values)
                        }}
                        {...props}
                        name={asText ? props.name : ''}
                    />
                </>
            ) : (
                <Input
                    as={
                        props?.mask
                            ? (InputMask as unknown as ElementType)
                            : undefined
                    }
                />
            )}
            <FormLabel>{props.label}</FormLabel>
        </FormControl>
    )
}

export default InputBox
