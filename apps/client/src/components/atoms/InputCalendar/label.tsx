'use client'

import * as React from 'react'

import { cn } from '@/common/lib/utils'

const InputCalendarLabel = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            className,
        )}
        {...props}
    />
))
InputCalendarLabel.displayName = 'InputCalendarLabel'

export { InputCalendarLabel }
