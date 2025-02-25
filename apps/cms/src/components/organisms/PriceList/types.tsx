import { InputNumberBoxProps } from '@/components/atoms/InputNumberBox/types'

export interface PriceListRootProps {
    children?: React.ReactNode
    onAdd?: (event: React.MouseEvent<HTMLButtonElement>) => void
    notFoundText?: string
    showAddButton?: boolean
}

export interface PriceListItemProps extends InputNumberBoxProps {
    title: string
    unityValue?: number
    value?: number
}
