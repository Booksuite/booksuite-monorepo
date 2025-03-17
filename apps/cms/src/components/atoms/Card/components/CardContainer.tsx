import { Stack, StackProps } from '@chakra-ui/react'
import React from 'react'

type CardContainerProps = StackProps

export const CardContainer: React.FC<CardContainerProps> = ({
    children,
    ...props
}) => (
    <Stack
        p={3}
        borderRadius={16}
        bg="#F0F4F8"
        direction="row"
        gap={3}
        transition="background-color 0.1s ease-in-out"
        display="table-row"
        {...props}
    >
        {children}
    </Stack>
)
