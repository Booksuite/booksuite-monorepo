import {
    AvailabilityAndPricing,
    AvailAndPricingReservationInput,
    CalendarDay,
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

export const getDayPrice = (
    day: Dayjs,
    availabilityAndPricing: AvailabilityAndPricing,
    weekendDays: number[],
) => {
    const dayOfWeek = day.day()
    const isWeekend = weekendDays.includes(dayOfWeek)
    const price = isWeekend
        ? availabilityAndPricing.weekendPrice
        : availabilityAndPricing.weekdaysPrice

    return price || 0
}
type GetCellColorPayload = {
    currentDay: Dayjs
    calendarDay: CalendarDay
    weekendDays: number[]
}
export const getCellBgColor = ({
    currentDay,
    calendarDay,
    weekendDays,
}: GetCellColorPayload) => {
    const hasOffer = !!calendarDay.offers

    const dayOfWeek = currentDay.day()
    const isWeekend = weekendDays.includes(dayOfWeek)
    const bgColor = hasOffer
        ? isWeekend
            ? 'blueGrey.300'
            : 'blueGrey.200'
        : isWeekend
          ? 'blueGrey.50'
          : 'white'

    return bgColor
}

export const getReservationColorFromStatus = (
    status: ReservationResponseFullDTOStatus,
): string => {
    return RESERVATION_STATUS_COLORS[status]
}

export const getTotalOccupancyPercentage = (
    day: Dayjs,
    totalUnits: number,
    reservations: AvailAndPricingReservationInput[],
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
