import {
    Text as ChakraText,
    TextProps as ChakraTextProps,
} from '@chakra-ui/react'
import React from 'react'

type CardTextProps = ChakraTextProps & {
    color?: string
}

export const CardText: React.FC<CardTextProps> = ({
    children,
    color = '#486581',
    ...props
}) => (
    <ChakraText
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight="normal"
        m={0}
        color={color}
        {...props}
    >
        {children}
    </ChakraText>
)
