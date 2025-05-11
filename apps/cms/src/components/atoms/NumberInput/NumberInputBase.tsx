import { IconButton, InputBase, InputBaseProps, Stack } from '@mui/material'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { forwardRef } from 'react'

interface NumberInputBaseProps extends InputBaseProps {
    value: number
    min?: number
    max?: number
}
export const NumberInputBase = forwardRef<
    HTMLInputElement,
    NumberInputBaseProps
>((props, ref) => {
    const { value, min, max } = props

    const valueNumber = Number(value)

    return (
        <Stack direction="row" alignItems="center" gap={1}>
            <IconButton
                color={props.color || 'primary'}
                tabIndex={-1}
                disabled={
                    props.disabled || (min !== undefined && valueNumber === min)
                }
                onClick={() => {
                    if (min !== undefined && valueNumber === min) return

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
                ref={ref}
                {...props}
                id={props.id || 'input-number-box'}
                type="number"
                sx={{
                    '& input': {
                        textAlign: 'center',
                        width: '30px',
                        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                            {
                                '-webkit-appearance': 'none',
                                margin: 0,
                            },
                        '&[type=number]': {
                            '-moz-appearance': 'textfield',
                        },
                    },
                }}
                onChange={(e) => {
                    const newValueNumber = Number(e.target.value)
                    if (min !== undefined && newValueNumber < min) return
                    if (max !== undefined && newValueNumber > max) return

                    props.onChange?.(e)
                }}
            />
            <IconButton
                color={props.color || 'primary'}
                tabIndex={-1}
                disabled={
                    props.disabled || (max !== undefined && valueNumber === max)
                }
                onClick={() => {
                    if (max !== undefined && valueNumber === max) return

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
    )
})
