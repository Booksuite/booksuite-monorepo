import { Media } from '@booksuite/sdk'
import { Grid, GridProps } from '@mui/material'

import { MediaItem } from '@/components/molecules/MediaItem'
import {
    MediaItemAction,
    MediaItemProps,
} from '@/components/molecules/MediaItem/types'

interface MediaItemsProps extends GridProps {
    actions?: MediaItemAction[]
    medias: Media[]
    selectedItems?: string[]
    selectable?: boolean
    onSelectItem?: (item: string) => void
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
        <Grid container spacing={3} columns={[2, 4, 9]} {...props}>
            {medias.map((item, index) => {
                return (
                    <Grid size={1} key={item.id || `${item.url}-${index}`}>
                        {renderItem ? (
                            renderItem({
                                item,
                                isSelected: selectedItems.includes(
                                    item.id || item.url,
                                ),
                                onSelect: () =>
                                    onSelectItem?.(item.id || item.url),
                                actions,
                                selectable,
                            })
                        ) : (
                            <MediaItem
                                key={item.id || `${item.url}-${index}`}
                                item={item}
                                isSelected={selectedItems.includes(
                                    item.id || item.url,
                                )}
                                onSelect={() =>
                                    onSelectItem?.(item.id || item.url)
                                }
                                actions={actions}
                                selectable={selectable}
                            />
                        )}
                    </Grid>
                )
            })}
        </Grid>
    )
}
