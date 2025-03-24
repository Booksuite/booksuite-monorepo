import { Flex, Text } from '@chakra-ui/react'
import { FiPlay } from 'react-icons/fi'

import { MediaItemProps } from '../../types'

export const MediaVideo: React.FC<MediaItemProps> = ({ item }) => {
    return (
        <Flex
            bg="gray.100"
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
            position="relative"
        >
            <FiPlay size={24} />
            {item.url.includes('youtube.com') ||
            item.url.includes('vimeo.com') ? (
                <Text
                    fontSize="xs"
                    position="absolute"
                    bottom="0"
                    p={1}
                    bg="blackAlpha.600"
                    color="white"
                    width="100%"
                    textAlign="center"
                >
                    Video Externo
                </Text>
            ) : null}
        </Flex>
    )
}
