import type { BillingType } from './BillingType.ts'

export type ReservationOptionSearchFilterInput = {
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type array | undefined
   */
  billingType?: BillingType[]
}