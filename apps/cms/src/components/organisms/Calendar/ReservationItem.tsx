import { Reservation } from '@booksuite/sdk'
import { Stack, Tooltip, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { NotepadText } from 'lucide-react'

import { CELL_HEIGHT, CELL_WIDTH, RESERVATION_ITEM_PADDING } from './constants'
import { getReservationColorFromStatus } from './utils'

interface ReservationItemProps {
    reservation: Reservation
    startOfCalendar: Dayjs
    onReservationClick: (reservation: Reservation) => void
}

export const ReservationItem: React.FC<ReservationItemProps> = ({
    reservation,
    startOfCalendar,
    onReservationClick,
}) => {
    const reservationKey = reservation.guestUser?.firstName || 'Reservation'
    const reservationStartDate = dayjs.utc(reservation.startDate).startOf('day')

    const totalDays = dayjs
        .utc(reservation.endDate)
        .endOf('day')
        .diff(reservationStartDate, 'days')

    const daysDiff = reservationStartDate.diff(startOfCalendar, 'days')

    const reservationTitle = [
        reservation.guestUser?.firstName,
        reservation.guestUser?.lastName,
    ]
        .filter((i) => i)
        .join(' ')

    const transformX =
        daysDiff * CELL_WIDTH + CELL_WIDTH / 2 + RESERVATION_ITEM_PADDING / 2
    const translateY = RESERVATION_ITEM_PADDING / 2 - 1

    const width = totalDays * CELL_WIDTH - RESERVATION_ITEM_PADDING / 2

    return (
        <Tooltip title={reservationTitle} placement="top">
            <Stack
                key={reservationKey}
                bgcolor={getReservationColorFromStatus(reservation.status)}
                sx={{
                    color: 'white',
                    width: `${width}px`,
                    height: CELL_HEIGHT - RESERVATION_ITEM_PADDING,
                    position: 'absolute',
                    transform: `skewX(-20deg) translateX(${transformX}px) translateY(${translateY}px)`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 0.5,
                    cursor: 'pointer',
                }}
                onClick={() => {
                    onReservationClick(reservation)
                }}
            >
                <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        transform: `skewX(20deg)`,
                    }}
                >
                    <Typography
                        key={reservationKey}
                        color="white"
                        fontWeight="600"
                        fontSize="13px"
                    >
                        {reservationTitle}
                    </Typography>
                    {reservation.notes && <NotepadText size={16} />}
                </Stack>
            </Stack>
        </Tooltip>
    )
}
