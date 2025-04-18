'use client'

import { useState } from 'react'

import { cn } from '@/common/lib/utils'

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
                className={cn(
                    'relative rounded-[10px] border transition-colors',
                    error && 'border-systemColors-red',
                    success && 'border-systemColors-green',
                    focused && !error && !success && 'border-primary-500',
                    !focused && !error && !success && 'border-grey-200',
                    disabled ? 'bg-systemColors-blueLight' : 'bg-white',
                )}
            >
                {label && (
                    <Label
                        htmlFor={props.id}
                        className={cn(
                            'absolute left-4 pointer-events-none transition-all duration-200',
                            isFloating
                                ? 'transform -translate-y-1 top-2 text-xs'
                                : 'top-[14px] text-base',
                            'font-normal',
                            error && 'text-systemColors-red',
                            success && 'text-systemColors-green',
                            disabled && 'text-grey-secondary',
                            !error &&
                                !success &&
                                !disabled &&
                                'text-grey-secondary',
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
                    className={cn(
                        'border-0',
                        isFloating && 'pt-5',
                        error && 'focus:ring-systemColors-red',
                        success && 'focus:ring-systemColors-green',
                        focused &&
                            !error &&
                            !success &&
                            'focus:ring-primary-500',
                        disabled && 'bg-grey-100 text-grey-secondary',
                        !disabled && 'bg-transparent',
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
                <p className="mt-1 text-sm text-systemColors-red">{error}</p>
            )}
        </div>
    )
}
