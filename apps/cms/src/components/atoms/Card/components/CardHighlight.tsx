import { Text, TextProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type CardHighlightProps = PropsWithChildren<
    Omit<TextProps, 'children'> & {
        color?: string
    }
>

export const CardHighlight: React.FC<CardHighlightProps> = ({
    children,
    color = 'gray.600',
    ...props
}) => (
    <Text fontSize="sm" color={color} {...props}>
        {children}
    </Text>
)
