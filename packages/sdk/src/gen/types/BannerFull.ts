import type { BannerMedia } from './BannerMedia.ts'

export const BannerResponseFullDTOPosition = {
  HOME_TOP: 'HOME_TOP',
  FEATURED_CONTENT: 'FEATURED_CONTENT',
} as const

type BannerResponseFullDTOPosition = (typeof BannerResponseFullDTOPosition)[keyof typeof BannerResponseFullDTOPosition]

export const BannerResponseFullDTOAction = {
  NONE: 'NONE',
  SMART_SEARCH: 'SMART_SEARCH',
  CUSTOM: 'CUSTOM',
  SEND_TO_WHATSAPP: 'SEND_TO_WHATSAPP',
} as const

type BannerResponseFullDTOAction = (typeof BannerResponseFullDTOAction)[keyof typeof BannerResponseFullDTOAction]

export type BannerFull = {
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
  position: BannerResponseFullDTOPosition
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
  action: BannerResponseFullDTOAction
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
  /**
   * @type array
   */
  medias: BannerMedia[]
}