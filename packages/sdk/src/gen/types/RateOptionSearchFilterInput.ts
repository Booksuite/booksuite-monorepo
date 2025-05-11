import type { BillingType } from './BillingType.ts'

export type RateOptionSearchFilterInput = {
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type array | undefined
   */
  billingType?: BillingType[]
  /**
   * @type array | undefined
   */
  housingUnitTypeIds?: string[]
}