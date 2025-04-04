import type { BillingType } from './BillingType.ts'
import type { ReservationOptionAgeGroupInput } from './ReservationOptionAgeGroupInput.ts'
import type { ReservationOptionHousingUnitTypeInput } from './ReservationOptionHousingUnitTypeInput.ts'

export type ReservationOptionInput = {
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
  availableHousingUnitTypes: ReservationOptionHousingUnitTypeInput[]
  /**
   * @type array
   */
  ageGroupPrices: ReservationOptionAgeGroupInput[]
  /**
   * @type array
   */
  includedItems: string[]
}