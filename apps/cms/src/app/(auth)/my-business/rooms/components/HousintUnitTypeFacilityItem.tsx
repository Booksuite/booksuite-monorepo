import { Facility } from '@booksuite/sdk'
import { Box, Text } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { Star } from 'lucide-react'

interface HousintUnitTypeFacilityItemProps {
    facility: Facility
    onClick?: (item: Facility) => void
    isFeatured?: boolean
}

export const HousintUnitTypeFacilityItem = ({
    facility,
    isFeatured,
    onClick,
}: HousintUnitTypeFacilityItemProps) => {
    return (
        <Box
            px={3}
            h={10}
            borderRadius="md"
            bg="gray.100"
            cursor="pointer"
            onClick={() => onClick?.(facility)}
            _hover={{
                bg: 'gray.200',
            }}
        >
            <HStack align="center" justify="space-between" h="100%">
                <Text flex={1} m={0} color="#102A43">
                    {facility.name}
                </Text>

                <Star
                    size={20}
                    color={isFeatured ? '#F35627' : '#334E68'}
                    fill={isFeatured ? '#F35627' : 'none'}
                />
            </HStack>
        </Box>
    )
}
