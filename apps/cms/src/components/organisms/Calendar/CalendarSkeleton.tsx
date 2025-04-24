'use client'

import { Box, Paper, Skeleton, Stack } from '@mui/material'

import { CalendarCell, HeaderCell, RoomCell } from './components/table'
import { HEADER_CELL_HEIGHT, ROOMS_COLUMN_WIDTH } from './constants'
import { isWeekendMultiple } from './utils'

interface CalendarSkeletonProps {
    numberOfDays?: number
    numberOfHousingTypes?: number
    numberOfUnitsPerHousingType?: number
}

export const CalendarSkeleton: React.FC<CalendarSkeletonProps> = ({
    numberOfDays = 30,
    numberOfHousingTypes = 2,
    numberOfUnitsPerHousingType = 2,
}) => {
    // Generate 30 days starting from today
    const days = Array.from({ length: numberOfDays })

    // Mock data for 2 housing types with 2 units each
    const housingTypes = [
        { name: 'Type 1', units: [{ name: 'Unit 1' }, { name: 'Unit 2' }] },
        { name: 'Type 2', units: [{ name: 'Unit 1' }, { name: 'Unit 2' }] },
    ]

    return (
        <Paper
            sx={{
                borderRadius: 2,
                boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
            }}
            elevation={0}
        >
            <Stack direction="row">
                <Stack width={ROOMS_COLUMN_WIDTH}>
                    <RoomCell
                        sx={{
                            bgcolor: 'blueGrey.700',
                            color: 'white',
                            height: HEADER_CELL_HEIGHT,
                        }}
                    >
                        <Skeleton
                            variant="text"
                            width={100}
                            height={24}
                            sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}
                        />
                    </RoomCell>
                    {Array.from({ length: numberOfHousingTypes }).map(
                        (_, typeIndex) => (
                            <Box key={typeIndex} sx={{ width: '100%' }}>
                                <RoomCell>
                                    <Skeleton
                                        variant="text"
                                        width={120}
                                        height={24}
                                        sx={{
                                            animationDelay: `${typeIndex * 0.3}s`,
                                        }}
                                    />
                                </RoomCell>

                                {Array.from({
                                    length: numberOfUnitsPerHousingType,
                                }).map((_, unitIndex) => (
                                    <RoomCell
                                        key={`unit-${typeIndex}-${unitIndex}`}
                                    >
                                        <Skeleton
                                            variant="text"
                                            width={80}
                                            height={20}
                                            sx={{
                                                animationDelay: `${typeIndex * 0.3}s`,
                                            }}
                                        />
                                    </RoomCell>
                                ))}
                            </Box>
                        ),
                    )}
                </Stack>
                <Box sx={{ overflowX: 'auto', flex: 1 }}>
                    <Stack direction="row">
                        {days.map((_, index) => (
                            <HeaderCell key={index} gap={0.5}>
                                <Skeleton
                                    variant="text"
                                    width={30}
                                    height={12}
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.3)',
                                        animationDelay: `${index * 0.3}s`,
                                    }}
                                />
                                <Skeleton
                                    variant="text"
                                    width={40}
                                    height={16}
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.3)',
                                        animationDelay: `${index * 0.3}s`,
                                    }}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    width={24}
                                    height={12}
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.3)',
                                        borderRadius: 0.3,
                                        animationDelay: `${index * 0.3}s`,
                                    }}
                                />
                            </HeaderCell>
                        ))}
                    </Stack>

                    {housingTypes.map((type, typeIndex) => (
                        <Box key={typeIndex}>
                            <Stack direction="row">
                                {days.map((_, dayIndex) => (
                                    <CalendarCell
                                        key={dayIndex}
                                        gap={0.5}
                                        bgcolor={
                                            isWeekendMultiple(dayIndex)
                                                ? 'blueGrey.50'
                                                : 'white'
                                        }
                                    >
                                        <Skeleton
                                            variant="rectangular"
                                            width={18}
                                            height={18}
                                            sx={{
                                                borderRadius: 0.6,
                                                animationDelay: `${typeIndex * dayIndex * 0.3}s`,
                                            }}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width={40}
                                            height={14}
                                        />
                                    </CalendarCell>
                                ))}
                            </Stack>
                            {type.units.map((_, unitIndex) => (
                                <Stack key={unitIndex} direction="row">
                                    {days.map((_, dayIndex) => (
                                        <CalendarCell
                                            key={dayIndex}
                                            bgcolor={
                                                isWeekendMultiple(dayIndex)
                                                    ? 'blueGrey.50'
                                                    : 'white'
                                            }
                                        />
                                    ))}
                                </Stack>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Stack>
        </Paper>
    )
}
