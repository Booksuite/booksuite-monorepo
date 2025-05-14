import { Media } from '@booksuite/sdk'

export interface MediaItemProps {
    item: Media
    selectable?: boolean
    isSelected?: boolean
    onSelect?: (item: Media) => void
    actions?: MediaItemAction[]
    hoverable?: boolean
}

export interface MediaItemAction {
    id: string
    onClick?: () => void
    children?: React.ReactNode
    icon?: React.ReactNode
}
