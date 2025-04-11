export type UtilityLinks = {
  /**
   * @type string
   */
  id: string
  /**
   * @type boolean
   */
  published: boolean
  /**
   * @type string
   */
  title: string
  /**
   * @type string
   */
  buttonLink: string
  /**
   * @type string, date-time
   */
  startDate?: string | null
  /**
   * @type string, date-time
   */
  endDate?: string | null
}