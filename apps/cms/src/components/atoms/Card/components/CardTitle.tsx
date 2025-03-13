import { Text, TextProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type CardTitleProps = PropsWithChildren<Omit<TextProps, 'children'>>

export const CardTitle: React.FC<CardTitleProps> = ({ children, ...props }) => (
    <Text
        fontSize={{ base: 'md', md: 'lg' }}
        m={0}
        fontWeight="medium"
        color="#102A43"
        {...props}
    >
        {children}
    </Text>
)
