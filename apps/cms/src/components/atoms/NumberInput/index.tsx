/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
    FormControl,
    FormHelperText,
    FormLabel,
    InputBaseProps,
    Stack,
    useTheme,
} from '@mui/material'
import { useRef } from 'react'

import { NumberInputBase } from './NumberInputBase'

export type NumberInputProps = InputBaseProps & {
    label?: string
    helperText?: string
    min?: number
    max?: number
}

export const NumberInput: React.FC<NumberInputProps> = ({
    label,
    helperText,
    min,
    max,
    ...props
}) => {
    const valueNumber = Number(props.value)
    const inputRef = useRef<HTMLInputElement>(null)
    const theme = useTheme()

    return (
        <FormControl>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
                onClick={() => {
                    inputRef.current?.focus()
                }}
                sx={{
                    border: `1px solid ${theme.palette.grey[400]}`,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    py: theme.spacing(2),
                    px: theme.spacing(3),
                    height: '56px',
                    '&:focus-within': {
                        outline: `2px inset ${theme.palette.primary.main}`,
                        outlineOffset: -1,
                    },
                }}
            >
                <FormLabel
                    color={props.color}
                    htmlFor={props.id || 'input-number-box'}
                >
                    {label ?? ' '}
                </FormLabel>

                <NumberInputBase
                    ref={inputRef}
                    value={valueNumber}
                    onChange={props.onChange}
                    min={min}
                    max={max}
                    color={props.color}
                />

                {/* <Stack direction="row" alignItems="center" gap={1}>
                    <IconButton
                        color={props.color || 'primary'}
                        tabIndex={-1}
                        disabled={
                            props.disabled ||
                            (min !== undefined && valueNumber === min)
                        }
                        onClick={() => {
                            if (min !== undefined && valueNumber === min) return

                            props.onChange?.({
                                target: {
                                    value: String(valueNumber - 1),
                                },
                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                        }}
                    >
                        <MinusCircle />
                    </IconButton>
                    <InputBase
                        ref={inputRef}
                        {...props}
                        id={props.id || 'input-number-box'}
                        type="number"
                        sx={{
                            '& input': {
                                textAlign: 'center',
                                width: '30px',
                                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                                    {
                                        '-webkit-appearance': 'none',
                                        margin: 0,
                                    },
                                '&[type=number]': {
                                    '-moz-appearance': 'textfield',
                                },
                            },
                        }}
                        onChange={(e) => {
                            const newValueNumber = Number(e.target.value)
                            if (min !== undefined && newValueNumber < min)
                                return
                            if (max !== undefined && newValueNumber > max)
                                return

                            props.onChange?.(e)
                        }}
                    />
                    <IconButton
                        color={props.color || 'primary'}
                        tabIndex={-1}
                        disabled={
                            props.disabled ||
                            (max !== undefined && valueNumber === max)
                        }
                        onClick={() => {
                            if (max !== undefined && valueNumber === max) return

                            props.onChange?.({
                                target: {
                                    value: String(valueNumber + 1),
                                },
                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                        }}
                    >
                        <PlusCircle />
                    </IconButton>
                </Stack> */}
            </Stack>
            <FormHelperText error={props.error}>{helperText}</FormHelperText>
        </FormControl>
    )
}
