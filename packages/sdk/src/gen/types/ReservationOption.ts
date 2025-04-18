import type { BillingType } from './BillingType.ts'

export type ReservationOption = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  name: string
  /**
   * @type boolean
   */
  published: boolean
  billingType: BillingType
  /**
   * @type number
   */
  additionalAdultPrice: number
  /**
   * @type number
   */
  additionalChildrenPrice: number
  /**
   * @type array
   */
  availableWeekend: number[]
  /**
   * @type array
   */
  includedItems: string[]
}