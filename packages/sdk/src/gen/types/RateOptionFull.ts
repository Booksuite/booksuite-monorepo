import type { BillingType } from './BillingType.ts'
import type { RateOptionAgeGroup } from './RateOptionAgeGroup.ts'
import type { RateOptionHousingUnitTypeInput } from './RateOptionHousingUnitTypeInput.ts'

export type RateOptionFull = {
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
  /**
   * @type array
   */
  availableHousingUnitTypes: RateOptionHousingUnitTypeInput[]
  /**
   * @type array
   */
  ageGroupPrices: RateOptionAgeGroup[]
}