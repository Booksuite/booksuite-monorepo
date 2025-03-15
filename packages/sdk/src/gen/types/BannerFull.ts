import type { BannerMedia } from './BannerMedia.ts'

export type BannerResponseFullDTOPosition = 'HOME_TOP' | 'FEATURED_CONTENT'

export type BannerResponseFullDTOAction = 'NONE' | 'SMART_SEARCH' | 'CUSTOM' | 'SEND_TO_WHATSAPP'

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