import { Image } from '@chakra-ui/react'

import { MediaItemProps } from '../../types'

export const MediaImage: React.FC<MediaItemProps> = ({ item }) => {
    return (
        <Image
            src={item.url}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            alt={(item.metadata as any).filename}
            objectFit="cover"
            w="100%"
            h="100%"
        />
    )
}
