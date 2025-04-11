import type { HousingUnitType } from './HousingUnitType.ts'

export type SpecialDateHousingUnitType = {
  /**
   * @type string
   */
  specialDateId: string
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