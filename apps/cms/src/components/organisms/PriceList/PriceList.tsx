'use client'

import { AddButton } from '@/components/atoms/AddButton'
import { PriceListRootProps } from './types'

export default function PriceListRoot({
    children,
    notFoundText,
    showAddButton = true,
    ...props
}: PriceListRootProps) {
    function handleAdd() {
        console.log('Adicionar item')

        if (props.onAdd) {
            props.onAdd
        }
    }

    return (
        <div
            className={`PriceListBox ${!children && 'PriceListBox--empty'}`}
            {...props}
        >
            {children ?? notFoundText}

            {showAddButton && (
                <AddButton
                    className={`${children && 'py-2'}`}
                    onClick={handleAdd}
                />
            )}
        </div>
    )
}
