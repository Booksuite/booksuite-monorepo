import type { CalendarDay } from './CalendarDay.ts'
import type { HousingUnit } from './HousingUnit.ts'

export type AvailabilityAndPricing = {
  /**
   * @description Housing unit type ID
   * @type string
   */
  id: string
  /**
   * @description Housing unit type name
   * @type string
   */
  name: string
  /**
   * @description Weekdays price
   * @type number
   */
  weekdaysPrice: number
  /**
   * @description Weekend price
   * @type number
   */
  weekendPrice: number
  /**
   * @description Calendar data
   * @type object
   */
  calendar: {
    [key: string]: CalendarDay
  }
  /**
   * @description List of housing units
   * @type array
   */
  housingUnits: HousingUnit[]
}