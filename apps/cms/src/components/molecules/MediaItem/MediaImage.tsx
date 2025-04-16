import { Image } from '@/components/atoms/Image'

import { MediaItemProps } from './types'

export const MediaImage: React.FC<MediaItemProps> = ({ item }) => {
    return (
        <Image
            src={item.url}
            alt={(item.metadata as any).filename}
            style={{ objectFit: 'cover' }}
        />
    )
}
