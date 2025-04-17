'use client'

import { useState } from 'react'

import { cn } from '@/common/lib/utils'
import { colors } from '@/common/theme'

import { Input } from './input'
import { Label } from './label'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    disabled?: boolean
    success?: boolean
}

export function InputText({
    label,
    error,
    success,
    className,
    disabled,
    value,
    defaultValue,
    ...props
}: InputTextProps) {
    const [focused, setFocused] = useState(false)
    const [inputValue, setInputValue] = useState<string>(
        (value ?? defaultValue ?? '').toString(),
    )

    const isFloating = focused || inputValue.length > 0

    return (
        <div className="relative">
            <div
                style={{
                    borderColor: error
                        ? colors.systemColors.red
                        : success
                          ? colors.systemColors.green
                          : focused
                            ? colors.systemColors.blue
                            : colors.coolGrey[200],
                    backgroundColor: disabled ? colors.coolGrey[100] : 'white',
                }}
                className={cn(
                    'relative rounded-[10px] border transition-colors',
                )}
            >
                {label && (
                    <Label
                        htmlFor={props.id}
                        style={{
                            color: error
                                ? colors.systemColors.red
                                : success
                                  ? colors.systemColors.green
                                  : disabled
                                    ? colors.coolGrey[500]
                                    : colors.grey.primary,
                        }}
                        className={cn(
                            'absolute left-4 pointer-events-none transition-all duration-200',
                            isFloating
                                ? 'transform -translate-y-1 top-2 text-xs'
                                : 'top-[14px] text-base',
                            'font-normal',
                        )}
                    >
                        {label}
                    </Label>
                )}
                <Input
                    {...props}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    style={{
                        backgroundColor: disabled
                            ? colors.coolGrey[100]
                            : 'transparent',
                        color: disabled ? colors.coolGrey[500] : 'inherit',
                    }}
                    className={cn(
                        'border-0',
                        isFloating && 'pt-5',
                        error && 'focus:ring-red-500',
                        success && 'focus:ring-green-500',
                        focused && !error && !success && 'focus:ring-blue-500',
                        className,
                    )}
                    onFocus={(e) => {
                        setFocused(true)
                        props.onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setFocused(false)
                        props.onBlur?.(e)
                    }}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        props.onChange?.(e)
                    }}
                />
            </div>
            {error && (
                <p
                    style={{ color: colors.systemColors.red }}
                    className="mt-1 text-sm"
                >
                    {error}
                </p>
            )}
        </div>
    )
}
