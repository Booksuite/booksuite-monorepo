'use client'

import {
    FormControl,
    FormControlProps,
    FormHelperText,
    FormLabel,
    IconButton,
    TextField,
    TextFieldProps,
} from '@mui/material'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { ChangeEvent, ReactNode, useRef } from 'react'

export interface InputNumberBoxProps
    extends Omit<TextFieldProps, 'onChange' | 'error'> {
    onChange?: (value: number | ChangeEvent<HTMLInputElement>) => void
    label?: string | ReactNode
    error?: string | ReactNode
    formControl?: {
        isInvalid?: boolean
    } & Omit<FormControlProps, 'error'>
    min?: number
}

export const InputNumberBox: React.FC<InputNumberBoxProps> = ({
    label,
    error,
    formControl,
    onChange,
    min = 0,
    value,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { isInvalid, ...formControlProps } = formControl || {}

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        const numericValue = newValue === '' ? NaN : Number(newValue)

        if (onChange) {
            if (onChange.length === 1) {
                // Se o callback espera apenas um valor, passa o número
                onChange(!isNaN(numericValue) ? numericValue : 0)
            } else {
                // Se o callback espera um evento, passa o evento
                onChange({
                    ...event,
                    target: { ...event.target, value: newValue },
                    currentTarget: { ...event.currentTarget, value: newValue },
                } as ChangeEvent<HTMLInputElement>)
            }
        }
    }

    const handleDecrement = () => {
        if (inputRef.current) {
            const minValue =
                typeof min === 'string' ? parseFloat(min) : min || 0
            const currentValue = Number(inputRef.current.value || 0)
            const newValue = Math.max(currentValue - 1, minValue)
            inputRef.current.value = String(newValue)
            triggerChange(newValue)
        }
    }

    const handleIncrement = () => {
        if (inputRef.current) {
            const currentValue = Number(inputRef.current.value || 0)
            const newValue = currentValue + 1
            inputRef.current.value = String(newValue)
            triggerChange(newValue)
        }
    }

    const triggerChange = (value: number) => {
        if (onChange) {
            if (onChange.length === 1) {
                onChange(value)
            } else {
                const event = {
                    target: { value: String(value) },
                    currentTarget: { value: String(value) },
                } as unknown as ChangeEvent<HTMLInputElement>
                onChange(event)
            }
        }
    }

    return (
        <FormControl
            error={isInvalid ?? !!error}
            fullWidth
            {...formControlProps}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #D9E2EC',
                    borderRadius: '8px',
                    padding: '10px',
                    justifyContent: 'space-between',
                    gap: '16px',
                }}
            >
                {label && (
                    <FormLabel style={{ flex: 1, color: '#0B1F51' }}>
                        {label}
                    </FormLabel>
                )}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#01337D',
                    }}
                >
                    <IconButton onClick={handleDecrement} size="small">
                        <CircleMinus size={23} color={'#0B1F51'} />
                    </IconButton>
                    <TextField
                        type="number"
                        inputRef={inputRef}
                        variant="standard"
                        margin="none"
                        value={value}
                        sx={{
                            width: '60px',
                            '& input': {
                                textAlign: 'center',
                                padding: 0,
                            },
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        inputProps={{
                            min:
                                typeof min === 'string' ? parseFloat(min) : min,
                        }}
                        {...props}
                        onChange={handleChange}
                    />
                    <IconButton onClick={handleIncrement} size="small">
                        <CirclePlus size={23} color={'#0B1F51'} />
                    </IconButton>
                </div>
            </div>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
