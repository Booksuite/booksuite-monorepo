import { Media } from '@booksuite/sdk'

import { MediaItemProps } from '@/components/molecules/MediaItem/types'

export interface MediaUrlInfo {
    url: string
    mimetype: string
    name: string
}

export interface MediaGalleryProps {
    selectedItems: string[]
    initialItems?: Media[]
    isOpen: boolean
    onClose: () => void
    onItemsChange?: (items: Media[]) => void
    onUpload?: (file: File) => Promise<Media>
    minItems?: number
    maxItems?: number
    allowVideos?: boolean
    allowExternalUrls?: boolean
}

export interface MediaGalleryItemProps extends MediaItemProps {
    isSelected: boolean
    onSelect: () => void
    onRemove: () => void
}

export interface MediaUploadButtonProps {
    onFileSelect: (file: File) => void
    disabled?: boolean
    accept?: string
}
