import {
    AvailAndPricingSummaryInput,
    Reservation,
    ReservationResponseFullDTOStatus,
} from '@booksuite/sdk'
import dayjs, { Dayjs } from 'dayjs'

import { RESERVATION_STATUS_COLORS, VALID_OCCUPANCY_STATUS } from './constants'

export const isWeekendMultiple = (index: number) => {
    const dayOfWeek = index % 7
    return dayOfWeek === 0 || dayOfWeek === 6
}

export const getDaysArray = (
    start: Date | string | Dayjs,
    end: Date | string | Dayjs,
) => {
    const days: Dayjs[] = []
    const startDayjs = dayjs.utc(start)
    const endDayjs = dayjs.utc(end)

    const diff = endDayjs.diff(startDayjs, 'day')

    for (let i = 0; i <= diff; i++) {
        days.push(startDayjs.add(i, 'day').clone())
    }
    return days
}

export const getDayPrice = (calendarDay: AvailAndPricingSummaryInput) => {
    return calendarDay.finalPrice
}

export const getReservationColorFromStatus = (
    status: ReservationResponseFullDTOStatus,
): string => {
    return RESERVATION_STATUS_COLORS[status]
}

export const getTotalOccupancyPercentage = (
    day: Dayjs,
    totalUnits: number,
    reservations: Reservation[],
): number => {
    if (totalUnits === 0) return 0

    const occupiedUnits = reservations.filter((reservation) => {
        const startDate = dayjs.utc(reservation.startDate).startOf('day')
        const endDate = dayjs.utc(reservation.endDate).endOf('day')
        return (
            day.isBetween(startDate, endDate, 'day', '[]') &&
            VALID_OCCUPANCY_STATUS.includes(reservation.status)
        )
    }).length

    return Math.round((occupiedUnits / totalUnits) * 100)
}
