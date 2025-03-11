export type Service = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  name: string
  /**
   * @type boolean
   */
  published: boolean
  /**
   * @type string
   */
  billType: string
  /**
   * @type number
   */
  price: number
  /**
   * @type number
   */
  adults: number
  /**
   * @type number
   */
  minDaily: number
  /**
   * @type number
   */
  minNotice: number
  /**
   * @type boolean
   */
  onlineSale: boolean
  /**
   * @type boolean
   */
  panelSale: boolean
  /**
   * @type boolean
   */
  seasonalSale: boolean
  /**
   * @type string, date-time
   */
  seasonStart: string
  /**
   * @type string, date-time
   */
  seasonEnd: string
  /**
   * @type string
   */
  description: string
  /**
   * @type string
   */
  included: string
  /**
   * @type string
   */
  notes: string
  /**
   * @type object | undefined
   */
  videoUrl?: object
}