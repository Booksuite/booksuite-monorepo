import type { HousingUnitType } from './HousingUnitType.ts'

export type SeasonRuleHousingUnitType = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  seasonRuleId: string
  housingUnitType: HousingUnitType
  /**
   * @type number
   */
  baseWeekPrice: number
  /**
   * @type number
   */
  newWeekPrice: number
  /**
   * @type number
   */
  weekendBasePrice: number
  /**
   * @type number
   */
  weekendNewPrice: number
}