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
  minStay: number
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
  reservationWindowStart: string | null
  /**
   * @type string
   */
  reservationWindowEnd: string | null
  /**
   * @type array
   */
  availableWeekDays: number[]
}