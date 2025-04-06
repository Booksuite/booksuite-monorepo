import type { BillingType } from './BillingType.ts'
import type { ReservationOptionAgeGroupInput } from './ReservationOptionAgeGroupInput.ts'
import type { ReservationOptionHousingUnitTypeInput } from './ReservationOptionHousingUnitTypeInput.ts'

export type ReservationOptionUpdateInput = {
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
  availableHousingUnitTypes?: ReservationOptionHousingUnitTypeInput[]
  /**
   * @type array | undefined
   */
  ageGroupPrices?: ReservationOptionAgeGroupInput[]
  /**
   * @type array | undefined
   */
  includedItems?: string[]
}