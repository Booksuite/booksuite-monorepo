import { Box, BoxProps } from '@mui/material'

interface ImageProps extends BoxProps {
    src?: string
    alt: string
}

export const Image = ({ src, alt, ...props }: ImageProps) => {
    return <Box component="img" src={src || ''} alt={alt} {...props} />
}
