import { Media } from '@booksuite/sdk'
import { MenuItemProps } from '@chakra-ui/react'

export interface MediaItemProps {
    item: Media
    selectable?: boolean
    isSelected?: boolean
    onSelect?: (item: Media) => void
    actions?: MediaItemAction[]
}

export interface MediaItemAction extends MenuItemProps {
    id: string
}
