export const BannerResponseDTOPosition = {
  HOME_TOP: 'HOME_TOP',
  FEATURED_CONTENT: 'FEATURED_CONTENT',
} as const

type BannerResponseDTOPosition = (typeof BannerResponseDTOPosition)[keyof typeof BannerResponseDTOPosition]

export const BannerResponseDTOAction = {
  NONE: 'NONE',
  SMART_SEARCH: 'SMART_SEARCH',
  CUSTOM: 'CUSTOM',
  SEND_TO_WHATSAPP: 'SEND_TO_WHATSAPP',
} as const

type BannerResponseDTOAction = (typeof BannerResponseDTOAction)[keyof typeof BannerResponseDTOAction]

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