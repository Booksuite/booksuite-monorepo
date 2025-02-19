import { InputNumberBoxProps } from '@/components/atoms/Input/types'

export interface PriceListRootProps {
    children?: React.ReactNode
    onAdd?: Function
    notFoundText?: string
    showAddButton?: boolean
}

export interface PriceListItemProps extends InputNumberBoxProps {
    title: string
    unityValue?: number
    value?: number
}
