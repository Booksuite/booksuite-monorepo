import { Media } from '@booksuite/sdk'

import { MediaImage } from './components/MediaItem/MediaImage'
import { MediaVideo } from './components/MediaItem/MediaVideo'

export const getMediaItem = (item: Media): React.ReactNode => {
    if (item.metadata.mimetype.toLowerCase().startsWith('image/'))
        return <MediaImage item={item} />

    return <MediaVideo item={item} />
}
