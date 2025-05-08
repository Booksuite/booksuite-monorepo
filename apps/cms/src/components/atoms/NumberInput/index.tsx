/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
    FormControl,
    FormHelperText,
    FormLabel,
    IconButton,
    InputBase,
    InputBaseProps,
    Stack,
    useTheme,
} from '@mui/material'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { useRef } from 'react'

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

                <Stack direction="row" alignItems="center" gap={1}>
                    <IconButton
                        color={props.color || 'primary'}
                        tabIndex={-1}
                        disabled={Boolean(
                            valueNumber === 0 ||
                                (min !== undefined && valueNumber === min),
                        )}
                        onClick={() => {
                            if (min && valueNumber === min) return

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
                                '&::-webkit-outer-spin-button': {
                                    appearance: 'none',
                                    margin: 0,
                                },
                                '&::-webkit-inner-spin-button': {
                                    appearance: 'none',
                                    margin: 0,
                                },
                            },
                        }}
                        onChange={(e) => {
                            const newValueNumber = Number(e.target.value)
                            if (min && newValueNumber < min) return
                            if (max && newValueNumber > max) return

                            props.onChange?.(e)
                        }}
                    />
                    <IconButton
                        color={props.color || 'primary'}
                        tabIndex={-1}
                        disabled={Boolean(
                            max !== undefined && valueNumber === max,
                        )}
                        onClick={() => {
                            if (max && valueNumber === max) return

                            props.onChange?.({
                                target: {
                                    value: String(valueNumber + 1),
                                },
                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                        }}
                    >
                        <PlusCircle />
                    </IconButton>
                </Stack>
            </Stack>
            <FormHelperText error={props.error}>{helperText}</FormHelperText>
        </FormControl>
    )
}
