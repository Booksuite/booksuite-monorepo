import type {
    HostingRulesInput,
    HousingUnitTypeFull,
    SeasonRulePaginated,
} from '@booksuite/sdk'
import {
    addDays,
    differenceInDays,
    format,
    isAfter,
    isBefore,
    startOfDay,
} from 'date-fns'

export function useCalendarPrices(
    housingUnitType: HousingUnitTypeFull | undefined,
    seasonRules: SeasonRulePaginated | undefined,
    companyHostingRules: HostingRulesInput | undefined,
) {
    const generateCalendarPrices = (
        targetHousingUnitType?: HousingUnitTypeFull,
    ) => {
        const unitToUse = targetHousingUnitType || housingUnitType
        if (!unitToUse || !seasonRules?.items || !companyHostingRules) {
            return {}
        }

        const prices: Record<
            string,
            {
                value: number
                available: number
                isUnavailable?: boolean
                isSpecialPrice?: boolean
                minDays?: number
            }
        > = {}

        const today = startOfDay(new Date())

        let startDate = today
        let endDate = addDays(today, companyHostingRules.fixedWindowPeriod)

        if (
            companyHostingRules.reservationWindowStart &&
            companyHostingRules.reservationWindowEnd
        ) {
            const windowStart = startOfDay(
                new Date(companyHostingRules.reservationWindowStart),
            )
            const windowEnd = startOfDay(
                new Date(companyHostingRules.reservationWindowEnd),
            )

            if (isAfter(windowStart, today)) {
                startDate = windowStart
            }
            endDate = windowEnd
        }

        const daysToShow = differenceInDays(endDate, startDate)

        for (let i = 0; i <= daysToShow; i++) {
            const currentDate = addDays(startDate, i)
            const dateKey = format(currentDate, 'yyyy-MM-dd')
            const dayOfWeek = currentDate.getDay()

            if (
                companyHostingRules.reservationWindowStart &&
                companyHostingRules.reservationWindowEnd &&
                (isBefore(
                    currentDate,
                    startOfDay(
                        new Date(companyHostingRules.reservationWindowStart),
                    ),
                ) ||
                    isAfter(
                        currentDate,
                        startOfDay(
                            new Date(companyHostingRules.reservationWindowEnd),
                        ),
                    ))
            ) {
                continue
            }

            const seasonRule = seasonRules.items.find((rule) => {
                const ruleStart = new Date(rule.startDate)
                const ruleEnd = new Date(rule.endDate)
                return currentDate >= ruleStart && currentDate <= ruleEnd
            })

            const isWeekendDay =
                companyHostingRules.availableWeekend.includes(dayOfWeek)
            const isWeekDay =
                companyHostingRules.availableWeekDays.includes(dayOfWeek)
            const isDayAvailable = isWeekendDay || isWeekDay

            if (!isDayAvailable) {
                continue
            }

            const basePrice = isWeekendDay
                ? unitToUse.weekendPrice || 0
                : unitToUse.weekdaysPrice || unitToUse.weekendPrice || 0
            const finalPrice = seasonRule ? seasonRule.price : basePrice

            prices[dateKey] = {
                value: finalPrice,
                available: 1,
                isUnavailable: isBefore(currentDate, today),
                isSpecialPrice: !!seasonRule,
                minDays: seasonRule?.minDaily || companyHostingRules?.minDaily,
            }
        }

        return prices
    }

    return { generateCalendarPrices }
}
