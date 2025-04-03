import type { BillingType } from './BillingType.ts'

export type ReservationOptionSearchFilterInput = {
  /**
   * @type boolean | undefined
   */
  published?: boolean
  billingType: BillingType
}