import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import { MoreVertical } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GalleryItem: React.FC<any> = ({ index, src, alt }) => {
    return (
        <Box position="relative" borderRadius="md" overflow="hidden">
            <Image w="full" src={src} alt={alt} />

            <Flex
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                p={1}
                justifyContent="space-between"
            >
                {index !== undefined && (
                    <Text fontSize="xs" fontWeight="bold" color="white" px={2}>
                        {index + 1}
                    </Text>
                )}

                <IconButton
                    aria-label="Opções"
                    icon={<MoreVertical />}
                    size="sm"
                    bg="white"
                    color={'blue.900'}
                    borderBottomLeftRadius="md"
                />
            </Flex>
        </Box>
    )
}
