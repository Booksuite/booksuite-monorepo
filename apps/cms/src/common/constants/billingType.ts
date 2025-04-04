import { BillingType } from '@booksuite/sdk'

type BillingTypeService = Exclude<BillingType, 'PER_HOUSING_UNIT'>

export const BILLING_TYPE_MAPPING: Record<BillingTypeService, string> = {
    DAILY: 'Diária',
    PER_GUEST: 'Por Hóspede',
    PER_GUEST_DAILY: 'Por Hóspede Por Dia',
    PER_RESERVATION: 'Por Reserva',
}

export const BILLING_TYPE_RESERVATION_OPTION_MAPPING: Record<
    BillingType,
    string
> = {
    DAILY: 'Diária',
    PER_GUEST: 'Por Hóspede',
    PER_GUEST_DAILY: 'Por Hóspede Por Dia',
    PER_RESERVATION: 'Por Reserva',
    PER_HOUSING_UNIT: 'Por Acomodação',
}
