'use client'

import {
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react'
import { useRef } from 'react'

import MinusIcon from '@/components/svgs/icons/MinusIcon'
import PlusIcon from '@/components/svgs/icons/PlusIcon'

import { InputNumberBoxProps } from './types'

export const InputNumberBox: React.FC<InputNumberBoxProps> = ({ ...props }) => {
    const inputRef = useRef(null)

    return (
        <FormControl
            display={'flex'}
            variant="number"
            onClick={() => {
                inputRef.current.focus()
            }}
        >
            <FormLabel>{props.label ?? ' '}</FormLabel>

            <NumberInput
                defaultValue={props.defaultValue ?? 0}
                min={props.min ?? 0}
                {...props}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <NumberInputField
                    ref={inputRef}
                    sx={{
                        textAlign: 'center',
                        paddingLeft:
                            'calc(100% - var(--number-input-input-padding) - 35px)',
                        backgroundColor: 'transparent',
                        border: 0,
                        outline: 0,
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
                        }}
                    >
                        <MinusIcon />
                    </NumberDecrementStepper>
                    <NumberIncrementStepper
                        sx={{
                            pointerEvents: 'auto',
                            border: '0 !important',
                            _active: { backgroundColor: 'inherit' },
                        }}
                    >
                        <PlusIcon />
                    </NumberIncrementStepper>
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    )
}
