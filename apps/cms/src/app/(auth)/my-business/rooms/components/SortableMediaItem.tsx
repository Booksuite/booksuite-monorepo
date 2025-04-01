import { HousingUnitTypeMedia } from '@booksuite/sdk'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Stack, Typography, useTheme } from '@mui/material'
import { GripIcon, ImageIcon } from 'lucide-react'

import { MediaItem } from '@/components/molecules/MediaItem'

interface SortableMediaItemProps {
    mediaItem: HousingUnitTypeMedia
    index: number
    handleSetFeatured: (index: number, isFeatured: boolean) => void
}

export const SortableMediaItem: React.FC<SortableMediaItemProps> = ({
    mediaItem,
    index,
    handleSetFeatured,
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
            <MediaItem
                key={mediaItem.media.id}
                item={mediaItem.media}
                actions={[
                    {
                        id: 'cover',
                        children: mediaItem.isFeatured
                            ? 'Remover capa'
                            : 'Definir como capa',
                        icon: <ImageIcon size={16} />,
                        onClick: () =>
                            handleSetFeatured(index, !mediaItem.isFeatured),
                    },
                ]}
            >
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
                {mediaItem.isFeatured && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        position="absolute"
                        bottom={theme.spacing(1)}
                        right={theme.spacing(1)}
                        bgcolor="white"
                        borderRadius={0.8}
                        py={0.8}
                        px={1}
                        gap={1}
                    >
                        <ImageIcon size={16} />
                        <Typography fontSize={12}>Capa</Typography>
                    </Stack>
                )}
            </MediaItem>
        </div>
    )
}
