import type { BillingType } from './BillingType.ts'
import type { RateOptionAgeGroupInput } from './RateOptionAgeGroupInput.ts'
import type { RateOptionHousingUnitTypeInput } from './RateOptionHousingUnitTypeInput.ts'

export type RateOptionInput = {
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
  availableHousingUnitTypes: RateOptionHousingUnitTypeInput[]
  /**
   * @type array
   */
  ageGroupPrices: RateOptionAgeGroupInput[]
  /**
   * @type array
   */
  includedItems: string[]
}