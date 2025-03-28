import { BillingType } from '@booksuite/sdk'

export const BILLING_TYPE_MAPPING: Record<BillingType, string> = {
    DAILY: 'Diária',
    PER_GUEST: 'Por Hóspede',
    PER_GUEST_DAILY: 'Por Hóspede Por Dia',
    PER_RESERVATION: 'Por Reserva'
}
