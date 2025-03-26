export type HostingRulesInput = {
  /**
   * @type number
   */
  checkIn: number
  /**
   * @type number
   */
  checkOut: number
  /**
   * @type number
   */
  minDaily: number
  /**
   * @type array
   */
  availableWeekend: number[]
  /**
   * @type string, date-time
   */
  seasonStart: string
  /**
   * @type string, date-time
   */
  seasonEnd: string
  /**
   * @type boolean
   */
  hostingOnSpecificDays: boolean
  /**
   * @type array
   */
  availableWeekDays: number[]
}