import { FiPlay } from 'react-icons/fi'

import { MediaItemProps } from './types'
import { Stack, Typography } from '@mui/material'

export const MediaVideo: React.FC<MediaItemProps> = ({ item }) => {
    return (
        <Stack
            bgcolor="gray.100"
            alignItems="center"
            justifyContent="center"
            position="relative"
        >
            <FiPlay size={24} />
            {item.url.includes('youtube.com') ||
            item.url.includes('vimeo.com') ? (
                <Typography
                    fontSize="xs"
                    position="absolute"
                    bottom="0"
                    p={1}
                    bgcolor="blackAlpha.600"
                    color="white"
                    width="100%"
                    textAlign="center"
                >
                    Video Externo
                </Typography>
            ) : null}
        </Stack>
    )
}
