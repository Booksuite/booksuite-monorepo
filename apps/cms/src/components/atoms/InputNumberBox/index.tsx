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
export type InputNumberBoxProps = InputBaseProps & {
    label?: string
    formHelperText?: string
    min?: number
    max?: number
}

export const InputNumberBox: React.FC<InputNumberBoxProps> = ({
    label,
    formHelperText,
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
                    padding: theme.spacing(1),
                    height: '56px',
                    '&:focus-within': {
                        outline: `2px inset ${theme.palette.primary.main}`,
                        outlineOffset: -1,
                    },
                }}
            >
                <FormLabel htmlFor={props.id || 'input-number-box'}>
                    {label ?? ' '}
                </FormLabel>

                <Stack direction="row" alignItems="center" gap={1}>
                    <IconButton
                        color="primary"
                        tabIndex={-1}
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
                        color="primary"
                        tabIndex={-1}
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
            <FormHelperText error={props.error}>
                {formHelperText}
            </FormHelperText>
        </FormControl>
    )
}
