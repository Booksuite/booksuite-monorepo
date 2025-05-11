import { BillingType } from '@booksuite/sdk'

export const BILLING_TYPE_MAPPING: Record<BillingType, string> = {
    DAILY: 'por diária',
    PER_GUEST: 'por hóspede',
    PER_GUEST_DAILY: 'por hóspede por dia',
    PER_RESERVATION: 'por reserva',
    PER_HOUSING_UNIT: 'por unidade',
}
