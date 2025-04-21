'use client'

import * as React from 'react'

import { cn } from '@/common/lib/utils'

const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn('text-base leading-none font-normal', className)}
        {...props}
    />
))
Label.displayName = 'Label'

export { Label }
