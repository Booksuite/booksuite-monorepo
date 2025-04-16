'use client'

import 'moment/locale/pt-br'

import { HousingUnitTypeFull, ReservationFull } from '@booksuite/sdk'
import { Box, Paper, Stack, styled, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import { useMemo } from 'react'

import { formatCurrency } from '@/common/utils/currency'

import { CELL_WIDTH, HEADER_CELL_HEIGHT } from './constants'
import { ReservationItem } from './ReservationItem'
import {
    getCellBgColor,
    getDayPrice,
    getDaysArray,
    getTotalOccupancyPercentage,
} from './utils'

type Reservation = ReservationFull & { id: string }

interface CalendarProps {
    startDate: Date | string | moment.Moment
    endDate: Date | string | moment.Moment
    housingTypes: HousingUnitTypeFull[]
    reservations: Reservation[]
}

const Cell = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    color: theme.palette.blueGrey[700],
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRight: `1px solid`,
    borderBottom: `1px solid`,
    borderColor: theme.palette.blueGrey[100],
    height: '46px',
}))

const RoomCell = styled(Cell)(({ theme }) => ({
    padding: theme.spacing(3),
    alignItems: 'flex-start',
    minWidth: '200px',
    width: 'auto',
}))

const HeaderCell = styled(Cell)(({ theme }) => ({
    backgroundColor: theme.palette.blueGrey[700],
    color: theme.palette.primary.contrastText,
    minWidth: CELL_WIDTH,
    maxWidth: CELL_WIDTH,
    height: HEADER_CELL_HEIGHT,
    fontWeight: 'bold',
}))

const CalendarCell = styled(Cell)(() => ({
    overflow: 'hidden',
    minWidth: CELL_WIDTH,
    maxWidth: CELL_WIDTH,
    '&:last-child': {
        borderRight: 'none',
    },
}))

type ReservationsByUnitByDay = {
    [unitId: string]: Reservation[]
}

export const Calendar: React.FC<CalendarProps> = ({
    startDate,
    endDate,
    housingTypes,
    reservations = [],
}) => {
    const days = getDaysArray(startDate, endDate)

    const reservationsByUnitByDay = useMemo(
        () =>
            reservations.reduce<ReservationsByUnitByDay>((acc, reservation) => {
                const unit = reservation.housingUnit.id

                if (!acc[unit]) acc[unit] = []

                acc[unit].push(reservation)
                return acc
            }, {}),
        [reservations],
    )
    const totalUnits = useMemo(
        () =>
            housingTypes.reduce(
                (acc, type) => acc + type.housingUnits.length,
                0,
            ),
        [housingTypes],
    )

    const startOfCalendar = moment(startDate).startOf('day')

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
                <Box>
                    <RoomCell
                        sx={{
                            bgcolor: 'blueGrey.700',
                            color: 'white',
                            height: HEADER_CELL_HEIGHT,
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            Unidades
                        </Typography>
                    </RoomCell>
                    {housingTypes.map((housingType, typeIndex) => (
                        <Box key={typeIndex}>
                            <RoomCell>
                                <Typography
                                    variant="h6"
                                    color="blueGrey.800"
                                    fontWeight="bold"
                                    fontSize="16px"
                                >
                                    {housingType.name}
                                </Typography>
                            </RoomCell>

                            {housingType.housingUnits.map((unit, unitIndex) => (
                                <Stack key={unitIndex} direction="row">
                                    <RoomCell>
                                        <Typography
                                            variant="body2"
                                            color="blueGrey.600"
                                            fontSize="14px"
                                        >
                                            {unit.name}
                                        </Typography>
                                    </RoomCell>
                                </Stack>
                            ))}
                        </Box>
                    ))}
                </Box>
                <Box sx={{ overflowX: 'auto' }}>
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
                                            {day.format('ddd')}
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

                    {housingTypes.map((housingType, typeIndex) => (
                        <Box key={typeIndex}>
                            <Stack direction="row">
                                {days.map((day, dayIndex) => (
                                    <CalendarCell
                                        key={dayIndex}
                                        gap={0.5}
                                        bgcolor={getCellBgColor(day)}
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
                                                getDayPrice(day, housingType),
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
                                            bgcolor={getCellBgColor(day)}
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
