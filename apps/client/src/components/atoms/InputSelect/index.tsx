'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'

import { cn } from '@/common/lib/utils'
import { colors } from '@/common/theme'

import { Label } from './label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select'

interface Option {
    value: string
    label: string
}

interface InputSelectProps {
    label?: string
    error?: string
    disabled?: boolean
    success?: boolean
    options: Option[]
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    placeholder?: string
    className?: string
}

export function InputSelect({
    label,
    error,
    success,
    disabled,
    options,
    value,
    defaultValue,
    onChange,
    placeholder,
    className,
}: InputSelectProps) {
    const [focused, setFocused] = useState(false)
    const [selectValue, setSelectValue] = useState<string>(
        value ?? defaultValue ?? '',
    )
    const [open, setOpen] = useState(false)

    const isFloating = focused || selectValue.length > 0

    return (
        <div className="relative w-full">
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
                    'relative rounded-[10px] border transition-colors min-h-[52px] overflow-hidden',
                    className,
                )}
            >
                {label && (
                    <Label
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
                            'absolute left-4 pointer-events-none transition-all duration-200 z-10',
                            isFloating
                                ? 'transform -translate-y-1 top-2 text-xs'
                                : 'top-[14px] text-base',
                        )}
                    >
                        {label}
                    </Label>
                )}
                <Select
                    value={selectValue}
                    onValueChange={(newValue: string) => {
                        setSelectValue(newValue)
                        onChange?.(newValue)
                    }}
                    disabled={disabled}
                    onOpenChange={setOpen}
                >
                    <SelectTrigger
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={cn(
                            'h-full w-full border-0 bg-transparent',
                            'flex items-center justify-between gap-3',
                            'px-4',
                            isFloating ? 'pt-7 pb-2' : 'py-3',
                            'outline-none focus:outline-none focus:ring-0 ring-0',
                            'shadow-none focus-visible:ring-0 focus-visible:ring-offset-0',
                            '[&>svg]:hidden',
                            '[&:focus]:outline-none [&:focus]:ring-0',
                        )}
                    >
                        <SelectValue
                            placeholder={placeholder}
                            className={cn(
                                !selectValue && 'text-gray-500 leading-normal',
                                selectValue &&
                                    'text-gray-900 leading-none mt-1',
                                disabled && 'text-gray-500',
                                'truncate',
                                'outline-none focus:outline-none',
                            )}
                        />
                        <div className="flex items-center justify-center flex-shrink-0">
                            <ChevronDown
                                className={cn(
                                    'absolute right-4 top-1/2 -translate-y-1/2',
                                    'h-5 w-5 transition-transform duration-200',
                                    'text-gray-400',
                                    open && 'rotate-180',
                                )}
                            />
                        </div>
                    </SelectTrigger>
                    <SelectContent
                        className={cn(
                            'bg-white border border-gray-200 shadow-lg rounded-lg p-1 z-50',
                            'outline-none focus:outline-none focus:ring-0 ring-0',
                        )}
                        position="popper"
                        sideOffset={8}
                    >
                        {options.length > 0 ? (
                            options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className={cn(
                                        'text-[15px] py-2 px-3 rounded-md cursor-pointer',
                                        'hover:bg-gray-100',
                                        'outline-none focus:outline-none focus:ring-0 ring-0',
                                        'data-[state=checked]:bg-gray-100',
                                        'focus-visible:ring-0 focus-visible:ring-offset-0',
                                        '[&:focus]:outline-none [&:focus]:ring-0',
                                    )}
                                >
                                    {option.label}
                                </SelectItem>
                            ))
                        ) : (
                            <div className="text-[15px] py-2 px-3 text-gray-500">
                                Nenhuma opção disponível
                            </div>
                        )}
                    </SelectContent>
                </Select>
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
