'use client'

import { FormControl, FormLabel, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'

import { TextAreaBoxProps } from './types'

export const TextAreaBox: React.FC<TextAreaBoxProps> = ({ ...props }) => {
    const [charCount, setCharCount] = useState(
        props.defaultValue?.toString().length ?? 0,
    )

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setCharCount(e.target.value.length)

        if (props.onChange) {
            props.onChange(e)
        }
    }

    return (
        <FormControl position="relative" width="100%" isolation="isolate">
            <FormLabel>{props.label}</FormLabel>
            <Textarea
                placeholder=" "
                {...props}
                onChange={handleChange}
                resize="none"
                border="1px solid"
                borderColor="inherit"
                borderRadius="md"
                p={4}
                _focus={{
                    borderColor: 'blue.500',
                    boxShadow: '0 0 0 1px #3182ce',
                }}
            />

            {props.maxLength && (
                <Text
                    position="absolute"
                    top="0.625rem"
                    right="0.625rem"
                    color="#89949f"
                    fontSize="sm"
                    zIndex={2}
                >
                    {charCount}/{props.maxLength}
                </Text>
            )}
        </FormControl>
    )
}
