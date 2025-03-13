import {
    Image as ChakraImage,
    ImageProps as ChakraImageProps,
} from '@chakra-ui/react'
import React from 'react'

type CardImageProps = Omit<ChakraImageProps, 'src' | 'alt'> & {
    src: string
    alt: string
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, ...props }) => (
    <ChakraImage
        borderRadius={9}
        w={{ base: '72px', md: 65 }}
        h={{ base: '72px', md: 65 }}
        src={src}
        alt={alt}
        {...props}
    />
)
