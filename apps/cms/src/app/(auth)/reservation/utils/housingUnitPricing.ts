import { useGetCalendarFromHousingUnitTypeId } from '@booksuite/sdk'
import dayjs from 'dayjs'

export const useHousingUnitPricing = (
    companyId: string,
    housingUnitTypeId: string | undefined,
    startDate: string,
    endDate: string,
    adults: number,
    ageGroups: { ageGroupId: string; quantity: number }[],
) => {
    return useGetCalendarFromHousingUnitTypeId(
        {
            housingUnitTypeId: housingUnitTypeId || '',
            companyId,
        },
        {
            currentDate: dayjs().toISOString(),
            viewWindow: {
                start: startDate,
                end: endDate,
            },
            search: {
                dateRange: {
                    start: startDate,
                    end: endDate,
                },
                adults: adults || 0,
                ageGroups:
                    ageGroups?.map((group) => ({
                        ageGroupId: Number(group.ageGroupId),
                        quantity: group.quantity,
                    })) || [],
            },
        },
        {
            query: {
                enabled: !!housingUnitTypeId && !!startDate && !!endDate,
            },
        },
    )
}
