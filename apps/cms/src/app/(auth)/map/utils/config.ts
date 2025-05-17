import { ReservationService } from '@booksuite/sdk'

import { HousingUnit } from '@booksuite/sdk'

import { HousingUnitType } from '@booksuite/sdk'

import { RateOptionFull, ReservationUpdateInput } from '@booksuite/sdk'

export type UpdateReservationFormData = Omit<
    ReservationUpdateInput,
    'ageGroups' | 'services'
> & {
    ageGroups: Record<string, number>
    rateOption: RateOptionFull | null
    housingUnitType: HousingUnitType | null
    availableHousingUnits: HousingUnit[]
    housingUnit: HousingUnit | null
    services: ReservationService[]
}
