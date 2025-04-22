'use client'

import { useState } from 'react'

import { cn } from '@/common/lib/utils'
import { Input } from '@/components/atoms/InputText/input'

import { InputCalendarLabel } from './label'

interface InputCalendarProps {
    onChange?: (date: Date) => void
    value?: Date
    label?: string
    error?: string
    success?: boolean
    disabled?: boolean
    className?: string
}

export function InputCalendar({
    onChange,
    value,
    label,
    error,
    success,
    disabled,
    className,
}: InputCalendarProps) {
    const [focused, setFocused] = useState(false)
    const [inputValue, setInputValue] = useState(
        value?.toISOString().split('T')[0] ?? '',
    )

    const isFloating = focused || inputValue.length > 0

    return (
        <div className="relative w-full">
            <div
                className={cn(
                    'relative rounded-[10px] border transition-colors w-full',
                    error && 'border-systemColors-red',
                    success && 'border-systemColors-green',
                    focused && !error && !success && 'border-primary-500',
                    !focused && !error && !success && 'border-grey-200',
                    disabled ? 'bg-systemColors-blueLight' : 'bg-white',
                )}
            >
                {label && (
                    <InputCalendarLabel
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
                    </InputCalendarLabel>
                )}
                <div className="relative flex items-center h-full w-full">
                    <Input
                        type="date"
                        className={cn(
                            'border-0 w-full',
                            'px-4',
                            isFloating && 'pt-5',
                            error && 'focus:ring-systemColors-red',
                            success && 'focus:ring-systemColors-green',
                            focused &&
                                !error &&
                                !success &&
                                'focus:ring-primary-500',
                            disabled && 'bg-grey-100 text-grey-secondary',
                            !disabled && 'bg-transparent',
                            '[&::-webkit-calendar-picker-indicator]:hidden',
                            !inputValue &&
                                '[&::-webkit-datetime-edit-fields-wrapper]:opacity-0',
                            '[&::-webkit-datetime-edit-fields-wrapper]:focus:opacity-100',
                            '[&::-webkit-datetime-edit-fields-wrapper]:not(:placeholder-shown):opacity-100',
                            '[&::-webkit-datetime-edit-fields-wrapper]:focus:text-grey-primary',
                            '[&::-webkit-datetime-edit-fields-wrapper]:not(:placeholder-shown):text-grey-primary',
                            '[&::-webkit-datetime-edit-year-field]:text-grey-primary',
                            '[&::-webkit-datetime-edit-month-field]:text-grey-primary',
                            '[&::-webkit-datetime-edit-day-field]:text-grey-primary',
                            '[&::-webkit-datetime-edit-text]:text-grey-primary',
                            '[&::-webkit-datetime-edit-text]:ml-0',
                            '[&::-webkit-datetime-edit]:ml-0',
                            !inputValue &&
                                '[&::-webkit-datetime-edit]:opacity-0',
                            '[&::-webkit-datetime-edit]:focus:opacity-100',
                            '[&::-webkit-datetime-edit]:not(:placeholder-shown):opacity-100',
                            className,
                        )}
                        disabled={disabled}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={(e) => {
                            const newValue = e.target.value
                            setInputValue(newValue)
                            if (newValue) {
                                onChange?.(new Date(newValue))
                            }
                        }}
                        value={inputValue}
                        placeholder=" "
                    />
                </div>
            </div>
            {error && (
                <p className="mt-1 text-sm text-systemColors-red">{error}</p>
            )}
        </div>
    )
}
