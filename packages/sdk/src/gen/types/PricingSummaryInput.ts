export type PricingSummaryInput = {
  /**
   * @description Base price for the day
   * @type number
   */
  basePrice: number
  /**
   * @description Services price for the day
   * @type number
   */
  servicesPrice: number
  /**
   * @description Children price for the day
   * @type number
   */
  childrenPrice: number
  /**
   * @description Rate option price for the day
   * @type number
   */
  rateOptionPrice: number
  /**
   * @description Final price for the day
   * @type number
   */
  finalPrice: number
}