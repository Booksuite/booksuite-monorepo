import { Media } from '@booksuite/sdk'
import { ResponsiveValue, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

import { MediaItem } from '@/components/molecules/MediaItem'
import {
    MediaItemAction,
    MediaItemProps,
} from '@/components/molecules/MediaItem/types'

interface MediaItemsProps extends SimpleGridProps {
    actions?: MediaItemAction[]
    medias: Media[]
    selectedItems?: string[]
    selectable?: boolean
    onSelectItem?: (item: string) => void
    columns?: ResponsiveValue<number>
    renderItem?: (props: MediaItemProps) => React.ReactNode
}

export const MediaItems: React.FC<MediaItemsProps> = ({
    medias,
    selectedItems = [],
    selectable,
    actions,
    onSelectItem,
    renderItem,
    ...props
}) => {
    return (
        <SimpleGrid gap={3} columns={[2, 4, 8]} {...props}>
            {medias.map((item, index) =>
                renderItem ? (
                    renderItem({
                        item,
                        isSelected: selectedItems.includes(item.id || item.url),
                        onSelect: () => onSelectItem?.(item.id || item.url),
                        actions,
                        selectable,
                    })
                ) : (
                    <MediaItem
                        key={item.id || `${item.url}-${index}`}
                        item={item}
                        isSelected={selectedItems.includes(item.id || item.url)}
                        onSelect={() => onSelectItem?.(item.id || item.url)}
                        actions={actions}
                        selectable={selectable}
                    />
                ),
            )}
        </SimpleGrid>
    )
}
