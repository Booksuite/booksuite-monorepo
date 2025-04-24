'use client'

import 'moment/locale/pt-br'

import {
    AvailabilityAndPricing,
    AvailAndPricingReservationInput,
    Reservation,
} from '@booksuite/sdk'
import { Box, Paper, Stack, Tooltip, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { useMemo } from 'react'

import { formatCurrency } from '@/common/utils/currency'

import { CalendarSkeleton } from './CalendarSkeleton'
import { CalendarCell, HeaderCell, RoomCell } from './components/table'
import { HEADER_CELL_HEIGHT, ROOMS_COLUMN_WIDTH } from './constants'
import { ReservationItem } from './ReservationItem'
import {
    getCellBgColor,
    getDayPrice,
    getDaysArray,
    getTotalOccupancyPercentage,
} from './utils'

interface CalendarProps {
    startDate: Date | string | Dayjs
    endDate: Date | string | Dayjs
    availabilityAndPricing?: AvailabilityAndPricing[]
    weekendDays?: number[]
    reservations?: Reservation[]
    isLoading?: boolean
}

type ReservationsByUnitByDay = {
    [unitId: string]: AvailAndPricingReservationInput[]
}

export const Calendar: React.FC<CalendarProps> = ({
    startDate,
    endDate,
    availabilityAndPricing = [],
    weekendDays = [0, 6],
    reservations = [],
    isLoading = false,
}) => {
    const days = useMemo(
        () => getDaysArray(startDate, endDate),
        [startDate, endDate],
    )

    const reservationsByUnitByDay = useMemo(
        () =>
            reservations.reduce<ReservationsByUnitByDay>((acc, reservation) => {
                const unit = reservation.housingUnitId
                if (!unit) return acc

                if (!acc[unit]) acc[unit] = []

                acc[unit].push(reservation)
                return acc
            }, {}),
        [reservations],
    )

    const totalUnits = useMemo(
        () =>
            availabilityAndPricing.reduce(
                (acc, type) => acc + type.housingUnits.length,
                0,
            ),
        [availabilityAndPricing],
    )

    const startOfCalendar = dayjs.utc(startDate).startOf('day')

    const formattedRange = `${startOfCalendar.format('DD/MM/YYYY')} até ${dayjs(endDate).format('DD/MM/YYYY')}`

    if (isLoading) return <CalendarSkeleton numberOfDays={days.length} />

    return (
        <Paper
            sx={{
                borderRadius: 1,
                boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
            }}
            elevation={0}
        >
            <Stack direction="row">
                <Stack width={ROOMS_COLUMN_WIDTH}>
                    <RoomCell
                        sx={{
                            flexDirection: 'row',
                            bgcolor: 'blueGrey.700',
                            color: 'white',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: 2,
                            height: HEADER_CELL_HEIGHT,
                        }}
                    >
                        <CalendarIcon size={16} />
                        <Typography
                            variant="subtitle1"
                            fontWeight="600"
                            fontSize={14}
                        >
                            {formattedRange}
                        </Typography>
                    </RoomCell>
                    {availabilityAndPricing.map((housingType, typeIndex) => (
                        <Box key={typeIndex} sx={{ width: '100%' }}>
                            <RoomCell>
                                <Typography
                                    variant="h6"
                                    color="blueGrey.800"
                                    fontWeight="bold"
                                    fontSize="16px"
                                    sx={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '100%',
                                    }}
                                >
                                    {housingType.name}
                                </Typography>
                            </RoomCell>

                            {housingType.housingUnits.map((unit) => (
                                <RoomCell key={unit.id}>
                                    <Typography
                                        variant="body2"
                                        color="blueGrey.600"
                                        fontSize="14px"
                                        sx={{
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        {unit.name}
                                    </Typography>
                                </RoomCell>
                            ))}
                        </Box>
                    ))}
                </Stack>
                <Box sx={{ overflowX: 'auto', flex: 1 }}>
                    <Stack direction="row">
                        {days.map((day, index) => {
                            const occupancyPct = getTotalOccupancyPercentage(
                                day,
                                totalUnits,
                                reservations,
                            )

                            return (
                                <Tooltip
                                    key={index}
                                    title={`${occupancyPct}% de ocupação`}
                                >
                                    <HeaderCell gap={0.5}>
                                        <Typography
                                            variant="caption"
                                            fontSize={12}
                                            lineHeight="12px"
                                        >
                                            {day.format('ddd').toUpperCase()}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            fontSize={13}
                                        >
                                            {day.format('DD/MM')}
                                        </Typography>
                                        <Box
                                            fontSize={8}
                                            sx={{
                                                bgcolor: 'white',
                                                borderRadius: 0.3,
                                                fontWeight: 'bold',
                                                color: 'blueGrey.700',
                                                px: 0.7,
                                                py: 0.1,
                                            }}
                                        >
                                            {occupancyPct}%
                                        </Box>
                                    </HeaderCell>
                                </Tooltip>
                            )
                        })}
                    </Stack>

                    {availabilityAndPricing.map((housingType, typeIndex) => (
                        <Box key={typeIndex}>
                            <Stack direction="row">
                                {days.map((day, dayIndex) => (
                                    <CalendarCell
                                        key={dayIndex}
                                        gap={0.5}
                                        bgcolor={getCellBgColor({
                                            calendarDay:
                                                housingType.calendar[
                                                    day.format('YYYY-MM-DD')
                                                ]!,
                                            currentDay: day,
                                            weekendDays,
                                        })}
                                    >
                                        <Box
                                            sx={{
                                                border: '2px solid',
                                                borderRadius: 0.6,
                                                padding: 0.1,
                                                fontWeight: 'bold',
                                                minWidth: '18px',
                                                fontSize: '9px',
                                            }}
                                        >
                                            {housingType.housingUnits.length}
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            fontSize="10px"
                                        >
                                            {formatCurrency(
                                                getDayPrice(
                                                    day,
                                                    housingType,
                                                    weekendDays,
                                                ),
                                            )}
                                        </Typography>
                                    </CalendarCell>
                                ))}
                            </Stack>
                            {housingType.housingUnits.map((unit, unitIndex) => (
                                <Stack
                                    key={unitIndex}
                                    direction="row"
                                    position="relative"
                                >
                                    {reservationsByUnitByDay[unit.id]?.map(
                                        (reservation) => (
                                            <ReservationItem
                                                key={reservation.id}
                                                reservation={reservation}
                                                startOfCalendar={
                                                    startOfCalendar
                                                }
                                            />
                                        ),
                                    )}
                                    {days.map((day, dayIndex) => (
                                        <CalendarCell
                                            key={dayIndex}
                                            bgcolor={getCellBgColor({
                                                calendarDay:
                                                    housingType.calendar[
                                                        day.format('YYYY-MM-DD')
                                                    ]!,
                                                currentDay: day,
                                                weekendDays,
                                            })}
                                        ></CalendarCell>
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
