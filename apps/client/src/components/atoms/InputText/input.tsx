import * as React from 'react'

import { cn } from '@/common/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-[52px] w-full rounded-[10px] px-4 text-base transition-all',
                    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                    'focus-visible:outline-none focus-visible:ring-1',
                    'disabled:cursor-not-allowed',
                    className,
                )}
                ref={ref}
                {...props}
            />
        )
    },
)
Input.displayName = 'Input'

export { Input }
