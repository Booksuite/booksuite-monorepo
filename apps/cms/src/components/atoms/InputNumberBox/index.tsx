'use client'

import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputProps,
    NumberInputStepper,
} from '@chakra-ui/react'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useRef } from 'react'

export interface InputNumberBoxProps
    extends Omit<NumberInputProps, 'onChange'> {
    onChange?: (value: number) => void
    label?: string | React.ReactNode
    error?: string
    formControl?: FormControlProps
}

export const InputNumberBox: React.FC<InputNumberBoxProps> = ({
    label,
    error,
    formControl,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <FormControl
            display={'flex'}
            variant="number"
            isInvalid={!!error}
            onClick={() => {
                inputRef.current?.focus()
            }}
            sx={{
                pl: 4,
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #D9E2EC',
                borderRadius: '8px',
                _focusWithin: {
                    borderColor: 'blue.500',
                    boxShadow: '0 0 0 1px #3182ce;',
                },
            }}
            {...formControl}
        >
            <FormLabel flex={1} m={0}>
                {label ?? ' '}
            </FormLabel>

            <NumberInput
                defaultValue={props.defaultValue ?? 0}
                min={props.min ?? 0}
                {...props}
                onChange={(_, newValue) => {
                    props.onChange?.(newValue)
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <NumberInputField
                    ref={inputRef}
                    sx={{
                        textAlign: 'center',
                        paddingLeft:
                            'calc(100% - var(--number-input-input-padding) - 35px)',
                        backgroundColor: 'transparent',
                        outline: 0,
                        boxShadow: 'none !important',
                        border: 'none !important',
                    }}
                />
                <NumberInputStepper
                    width={'100px'}
                    flexDirection={'row'}
                    gap={'30px'}
                    sx={{
                        pointerEvents: 'none',
                    }}
                >
                    <NumberDecrementStepper
                        sx={{
                            pointerEvents: 'auto',
                            border: '0 !important',
                            _active: { backgroundColor: 'inherit' },
                            color: 'blue.900',
                        }}
                    >
                        <CircleMinus />
                    </NumberDecrementStepper>
                    <NumberIncrementStepper
                        sx={{
                            pointerEvents: 'auto',
                            border: '0 !important',
                            _active: { backgroundColor: 'inherit' },
                            color: 'blue.900',
                        }}
                    >
                        <CirclePlus />
                    </NumberIncrementStepper>
                </NumberInputStepper>
            </NumberInput>

            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
}
