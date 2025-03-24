import { Media } from '@booksuite/sdk'

import { MediaImage } from './MediaImage'
import { MediaVideo } from './MediaVideo'

export const getMediaItem = (item: Media): React.ReactNode => {
    if (item.metadata.mimetype.toLowerCase().startsWith('image/'))
        return <MediaImage item={item} />

    return <MediaVideo item={item} />
}
