import type { BillingType } from './BillingType.ts'
import type { RateOptionAgeGroupInput } from './RateOptionAgeGroupInput.ts'
import type { RateOptionHousingUnitTypeInput } from './RateOptionHousingUnitTypeInput.ts'

export type RateOptionUpdateInput = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type boolean | undefined
   */
  published?: boolean
  billingType?: BillingType
  /**
   * @type number | undefined
   */
  additionalAdultPrice?: number
  /**
   * @type number | undefined
   */
  additionalChildrenPrice?: number
  /**
   * @type array | undefined
   */
  availableWeekend?: number[]
  /**
   * @type array | undefined
   */
  availableHousingUnitTypes?: RateOptionHousingUnitTypeInput[]
  /**
   * @type array | undefined
   */
  ageGroupPrices?: RateOptionAgeGroupInput[]
  /**
   * @type array | undefined
   */
  includedItems?: string[]
}