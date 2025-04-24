import type {
    HostingRulesInput,
    HousingUnitTypeFull,
    SeasonRulePaginated,
} from '@booksuite/sdk'
import { addDays, endOfMonth, format, startOfMonth } from 'date-fns'

interface CalendarPrice {
    value: number
    available: number
    isSpecialPrice?: boolean
}

export function useCalendarPrices(
    housingUnit: HousingUnitTypeFull | undefined,
    seasonRules: SeasonRulePaginated | undefined,
    hostingRules: HostingRulesInput | undefined,
) {
    const generateCalendarPrices = () => {
        if (!housingUnit?.weekendPrice) return {}

        const today = new Date()
        const startDate = startOfMonth(today)
        const endDate = endOfMonth(addDays(today, 60))

        const prices: Record<string, CalendarPrice> = {}
        let currentDate = startDate

        const weekendDays = hostingRules?.availableWeekend ?? [6, 0]

        while (currentDate <= endDate) {
            const dateKey = format(currentDate, 'yyyy-MM-dd')
            const isWeekend = weekendDays.includes(currentDate.getDay())

            const seasonRule = seasonRules?.items.find((sr) => {
                const startDate = new Date(sr.startDate)
                const endDate = new Date(sr.endDate)
                const currentDateObj = new Date(dateKey)
                return (
                    currentDateObj >= startDate &&
                    currentDateObj <= endDate &&
                    sr.availableWeekDays.includes(currentDateObj.getDay())
                )
            })

            if (seasonRule) {
                prices[dateKey] = {
                    value: seasonRule.price,
                    available: 1,
                    isSpecialPrice: true,
                }
            } else {
                prices[dateKey] = {
                    value: isWeekend
                        ? housingUnit.weekendPrice
                        : housingUnit.weekdaysPrice || housingUnit.weekendPrice,
                    available: 1,
                    isSpecialPrice: false,
                }
            }

            currentDate = addDays(currentDate, 1)
        }

        return prices
    }

    return {
        generateCalendarPrices,
    }
}
