export type BannerResponseDTOPosition = 'HOME_TOP' | 'FEATURED_CONTENT'

export type BannerResponseDTOAction = 'NONE' | 'SMART_SEARCH' | 'CUSTOM' | 'SEND_TO_WHATSAPP'

export type Banner = {
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
  name: string
  /**
   * @type string
   */
  position: BannerResponseDTOPosition
  /**
   * @type number
   */
  order: number | null
  /**
   * @type string
   */
  title: string | null
  /**
   * @type string
   */
  description: string | null
  /**
   * @type string
   */
  action: BannerResponseDTOAction
  /**
   * @type string
   */
  actionButtonText: string | null
  /**
   * @type string
   */
  actionButtonLink: string | null
  /**
   * @type string, date-time
   */
  startAt: string | null
  /**
   * @type string, date-time
   */
  endAt: string | null
}