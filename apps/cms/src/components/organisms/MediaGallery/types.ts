import { Media } from '@booksuite/sdk'

export interface MediaItem extends Media {}

export interface MediaUrlInfo {
    url: string
    mimetype: string
    name: string
}

export interface MediaGalleryProps {
    selectedItems: string[]
    initialItems?: MediaItem[]
    isOpen: boolean
    onClose: () => void
    onItemsChange?: (items: MediaItem[]) => void
    onUpload?: (file: File) => Promise<MediaItem>
    maxItems?: number
    allowVideos?: boolean
    allowExternalUrls?: boolean
}

export interface MediaItemProps {
    item: MediaItem
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
