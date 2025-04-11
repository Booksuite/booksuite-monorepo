export type UtilityLinksUpdateInput = {
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type string | undefined
   */
  title?: string
  /**
   * @type string | undefined
   */
  buttonLink?: string
  /**
   * @type string, date-time
   */
  startDate?: string | null
  /**
   * @type string, date-time
   */
  endDate?: string | null
}