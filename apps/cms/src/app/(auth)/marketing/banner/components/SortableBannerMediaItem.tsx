import { BannerMedia } from '@booksuite/sdk'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, Stack, useTheme } from '@mui/material'
import { GripIcon } from 'lucide-react'

import { MediaItem } from '@/components/molecules/MediaItem'

interface SortableBannerMediaItemProps {
    mediaItem: BannerMedia
}

export const SortableBannerMediaItem: React.FC<
    SortableBannerMediaItemProps
> = ({ mediaItem }) => {
    const theme = useTheme()

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: mediaItem.media.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: 'relative' as const,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <Box
                width={600}
                height={370}
                overflow="hidden"
                borderRadius={1}
                position="relative"
                margin={'auto'}
            >
                <MediaItem key={mediaItem.media.id} item={mediaItem.media}>
                    <Stack
                        top="50%"
                        left="50%"
                        bgcolor={`${theme.palette.blueGrey[900]}90`}
                        borderRadius={0.8}
                        p={1}
                        className="drag-handle hideable"
                        sx={{
                            transform: 'translate(-50%, -50%)',
                            cursor: 'grab',
                            '&:active': {
                                cursor: 'grabbing',
                            },
                            position: 'absolute',
                        }}
                        {...listeners}
                    >
                        <GripIcon size={16} color="white" />
                    </Stack>
                </MediaItem>
            </Box>
        </div>
    )
}
