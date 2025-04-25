import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(localeData)

dayjs.locale('pt-br')

export const formatDate = (date: Date | string, format: string) => {
    return dayjs(date).format(format)
}

export const addDays = (date: Date | string, days: number) => {
    return dayjs(date).add(days, 'day').toDate()
}

export const subDays = (date: Date | string, days: number) => {
    return dayjs(date).subtract(days, 'day').toDate()
}

export const addMonths = (date: Date | string, months: number) => {
    return dayjs(date).add(months, 'month').toDate()
}

export const subMonths = (date: Date | string, months: number) => {
    return dayjs(date).subtract(months, 'month').toDate()
}

export const startOfDay = (date: Date | string) => {
    return dayjs(date).startOf('day').toDate()
}

export const startOfMonth = (date: Date | string) => {
    return dayjs(date).startOf('month').toDate()
}

export const endOfMonth = (date: Date | string) => {
    return dayjs(date).endOf('month').toDate()
}

export const isBefore = (date: Date | string, compareDate: Date | string) => {
    return dayjs(date).isBefore(compareDate)
}

export const isAfter = (date: Date | string, compareDate: Date | string) => {
    return dayjs(date).isAfter(compareDate)
}

export const isSameMonth = (
    date: Date | string,
    compareDate: Date | string,
) => {
    return dayjs(date).isSame(compareDate, 'month')
}

export const differenceInDays = (
    date1: Date | string,
    date2: Date | string,
) => {
    return dayjs(date1).diff(date2, 'day')
}

export const eachDayOfInterval = ({
    start,
    end,
}: {
    start: Date | string
    end: Date | string
}) => {
    const days: Date[] = []
    let current = dayjs(start)
    const endDate = dayjs(end)

    while (current.isSameOrBefore(endDate, 'day')) {
        days.push(current.toDate())
        current = current.add(1, 'day')
    }

    return days
}

export { dayjs }
