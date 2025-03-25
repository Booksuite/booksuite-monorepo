import { HousingUnitTypeMedia } from '@booksuite/sdk'
import { HStack, Text } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
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
                <HStack
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    bg="blackAlpha.300"
                    borderRadius={4}
                    p={1}
                    className="drag-handle hideable"
                    css={{
                        cursor: 'grab',
                        '&:active': {
                            cursor: 'grabbing',
                        },
                    }}
                    {...listeners}
                >
                    <GripIcon size={16} color="white" />
                </HStack>
                {mediaItem.isFeatured && (
                    <HStack
                        position="absolute"
                        bottom={1}
                        right={1}
                        bg="white"
                        borderRadius={4}
                        py={0.5}
                        px={1}
                        gap={0.5}
                    >
                        <ImageIcon size={16} />
                        <Text fontSize="xs">Capa</Text>
                    </HStack>
                )}
            </MediaItem>
        </div>
    )
}
