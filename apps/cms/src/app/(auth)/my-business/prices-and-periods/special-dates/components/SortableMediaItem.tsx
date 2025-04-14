import { ServiceMedia } from '@booksuite/sdk'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Stack, useTheme } from '@mui/material'
import { GripIcon } from 'lucide-react'

import { MediaItem } from '@/components/molecules/MediaItem'

interface SortableMediaItemProps {
    mediaItem: ServiceMedia
}

export const SortableMediaItem: React.FC<SortableMediaItemProps> = ({
    mediaItem,
}) => {
    const theme = useTheme()

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: mediaItem.media.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: 'relative' as const,
        zIndex: isDragging ? 1 : 'auto',
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <MediaItem key={mediaItem.media.id} item={mediaItem.media}>
                <Stack
                    position="absolute"
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
                    }}
                    {...listeners}
                >
                    <GripIcon size={16} color="white" />
                </Stack>
            </MediaItem>
        </div>
    )
}
