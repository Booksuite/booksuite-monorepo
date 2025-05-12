import { TextField, TextFieldProps } from '@mui/material'
import { ChangeEvent } from 'react'
import { CurrencyInput } from 'react-currency-mask'

import { formatCurrency } from '@/common/utils/currency'

export type TextFieldCurrencyProps = Omit<TextFieldProps, 'type'>

export const TextFieldCurrency: React.FC<TextFieldCurrencyProps> = ({
    onChange,
    ...props
}) => {
    return (
        <CurrencyInput
            value={formatCurrency(props.value as number)}
            InputElement={<TextField {...props} />}
            onChangeValue={(_, value) => {
                onChange?.({
                    currentTarget: { value },
                    target: { value },
                } as ChangeEvent<HTMLInputElement>)
            }}
        />
    )
}
