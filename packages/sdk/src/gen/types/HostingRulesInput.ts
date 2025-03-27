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
   * @type number
   */
  fixedWindowPeriod: number
  /**
   * @type array
   */
  availableWeekend: number[]
  /**
   * @type string
   */
  reservationWindowStart: string
  /**
   * @type string
   */
  reservationWindowEnd: string
  /**
   * @type array
   */
  availableWeekDays: number[]
}