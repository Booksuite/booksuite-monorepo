'use client'

import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    Text,
    Textarea,
    TextareaProps,
} from '@chakra-ui/react'
import React from 'react'

export interface TextAreaBoxProps extends TextareaProps {
    formControl?: FormControlProps
    label?: string
    error?: string
}

export const TextAreaBox: React.FC<TextAreaBoxProps> = ({
    label,
    error,
    formControl,
    ...props
}) => {
    const charCount = props.value?.toString().length ?? 0

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (props.onChange) {
            props.onChange(e)
        }
    }

    return (
        <FormControl
            position="relative"
            width="100%"
            isolation="isolate"
            isInvalid={!!error}
            {...formControl}
        >
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
            <FormLabel>{label}</FormLabel>
            <FormErrorMessage>{error}</FormErrorMessage>

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
