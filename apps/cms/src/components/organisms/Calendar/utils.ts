import {
    HousingUnitTypeFull,
    ReservationFull,
    ReservationResponseFullDTOStatus,
} from '@booksuite/sdk'
import { green, red, yellow } from '@mui/material/colors'
import moment from 'moment'

import { VALID_OCCUPANCY_STATUS } from './constants'

export const getDaysArray = (
    start: Date | string | moment.Moment,
    end: Date | string | moment.Moment,
) => {
    const days: moment.Moment[] = []
    const current = moment(start)
    const endMoment = moment(end)

    while (current.isSameOrBefore(endMoment)) {
        days.push(current.clone())
        current.add(1, 'day')
    }
    return days
}

export const getDayPrice = (
    day: moment.Moment,
    housingType: HousingUnitTypeFull,
) => {
    const dayOfWeek = moment(day).day()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const price = isWeekend
        ? housingType.weekendPrice
        : housingType.weekdaysPrice

    return price || 0
}

export const getCellBgColor = (day: moment.Moment) => {
    const dayOfWeek = moment(day).day()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const bgColor = isWeekend ? 'blueGrey.50' : 'white'

    return bgColor
}

export const getReservationColorFromStatus = (
    status: ReservationResponseFullDTOStatus,
): string => {
    switch (status) {
        case 'WAITING_PAYMENT':
            return yellow[800]
        case 'CONFIRMED':
            return green[500]
        case 'CHECKED_IN':
            return green[900]
        case 'CHECKED_OUT':
            return 'blueGrey.400'
        case 'ABANDONED':
        case 'CANCELLED':
            return red[800]
        default:
            return 'blueGrey.500'
    }
}

export const getTotalOccupancyPercentage = (
    day: moment.Moment,
    totalUnits: number,
    reservations: (ReservationFull & { id: string })[],
): number => {
    if (totalUnits === 0) return 0

    const occupiedUnits = reservations.filter((reservation) => {
        const startDate = moment(reservation.startDate).startOf('day')
        const endDate = moment(reservation.endDate).endOf('day')
        return (
            day.isBetween(startDate, endDate, 'day', '[]') &&
            VALID_OCCUPANCY_STATUS.includes(reservation.status)
        )
    }).length

    return Math.round((occupiedUnits / totalUnits) * 100)
}
