import { Box, IconButton, Image, Text, VStack } from '@chakra-ui/react'
import { EllipsisVertical } from 'lucide-react'

export const Card = {
    Container: ({ children }) => (
        <Box p={4} borderRadius="md" boxShadow="md" bg="white">
            {children}
        </Box>
    ),
    Section: ({ children }) => (
        <VStack align="start" spacing={2}>
            {children}
        </VStack>
    ),
    Image: ({ src, alt, ...props }) => (
        <Image borderRadius="md" src={src} alt={alt} {...props} />
    ),
    Title: ({ children }) => (
        <Text fontSize="lg" fontWeight="bold">
            {children}
        </Text>
    ),
    Text: ({ children, color = 'gray.600' }) => (
        <Text fontSize="sm" color={color}>
            {children}
        </Text>
    ),
    Highlight: ({ children, color = 'gray.600' }) => (
        <Text fontSize="sm" color={color}>
            {children}
        </Text>
    ),
    OptionDots: () => (
        <IconButton
            icon={<EllipsisVertical />}
            variant="ghost"
            aria-label="Options"
        />
    ),
}
