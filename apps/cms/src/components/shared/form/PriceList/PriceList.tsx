'use client'

import { AddButton } from '@/src/components/shared/AddButton'

interface PriceListRootProps {
    children?: React.ReactNode
    onAdd?: Function
    notFoundText?: string
    showAddButton?: boolean
}

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
