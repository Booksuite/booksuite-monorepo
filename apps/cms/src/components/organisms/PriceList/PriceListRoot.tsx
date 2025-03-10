'use client'

import { Box, Text } from '@chakra-ui/react'

import { AddButton } from '@/components/atoms/AddButton'

import { PriceListRootProps } from './types'

export const PriceListRoot: React.FC<PriceListRootProps> = ({
    children,
    notFoundText,
    showAddButton = true,
    ...props
}) => {
    return (
        <Box
            fontSize="0.875rem"
            fontWeight="500"
            bg={children ? 'transparent' : '#f1f5f9'}
            color={children ? 'inherit' : 'gray.700'}
            textAlign="center"
            p={children ? 0 : 5}
            borderRadius="md"
            border={children ? '1px solid #e2e8f0' : 'none'}
            {...props}
        >
            {children ?? <Text>{notFoundText}</Text>}

            {showAddButton && props.onAdd && (
                <AddButton
                    mt={children ? 2 : 4}
                    onClick={(event) => props.onAdd?.(event)}
                />
            )}
        </Box>
    )
}
