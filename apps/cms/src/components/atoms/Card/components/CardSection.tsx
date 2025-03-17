import { Stack, StackProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type CardSectionProps = PropsWithChildren<Omit<StackProps, 'children'>>

export const CardSection: React.FC<CardSectionProps> = ({
    children,
    ...props
}) => {
    return (
        <Stack
            align={{ base: 'flex-start', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            justify={{ base: 'flex-start', md: 'space-between' }}
            gap={{ base: 0.5, md: 2 }}
            display="contents"
            css={{
                '& > *': {
                    display: 'table-cell',
                    verticalAlign: 'middle',
                },
            }}
            {...props}
        >
            {children}
        </Stack>
    )
}
