'use client'

import { useState } from 'react'

import LabelBadge from '@/components/shared/form/LabelBadge'
import InputNumberBox, {
    InputNumberBoxProps,
} from '@/src/components/shared/form/InputNumberBox'

interface PriceListItemProps extends InputNumberBoxProps {
    title: string
    unityValue?: number
    value?: number
}

export function PriceListItem(props: PriceListItemProps) {
    const [total, setTotal] = useState(
        props?.value ? props.value * props.unityValue : 0,
    )

    return (
        <InputNumberBox
            onChange={(inputValue) => {
                setTotal(props.unityValue * parseFloat(inputValue))
            }}
            label={
                <>
                    {props.title}
                    {props.unityValue && (
                        <LabelBadge className="block">
                            {props.unityValue} un <br />
                            Total: R$ {total}
                        </LabelBadge>
                    )}
                </>
            }
            {...props}
        />
    )
}
