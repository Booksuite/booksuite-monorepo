import { Facility } from '@booksuite/sdk'
import { Box, Stack, Typography } from '@mui/material'
import { Star } from 'lucide-react'
import { useCallback } from 'react'

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
    const handleClick = useCallback(() => {
        onClick?.(facility)
    }, [onClick, facility])

    return (
        <Box
            px={3}
            height={40}
            borderRadius={1}
            bgcolor="grey.100"
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: 'grey.200',
                },
            }}
            onClick={handleClick}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                height="100%"
            >
                <Typography flex={1} m={0} color="#102A43">
                    {facility.name}
                </Typography>

                <Star
                    size={20}
                    color={isFeatured ? '#F35627' : '#334E68'}
                    fill={isFeatured ? '#F35627' : 'none'}
                />
            </Stack>
        </Box>
    )
}
