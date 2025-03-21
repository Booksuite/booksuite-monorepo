import type { BannerMediaInput } from './BannerMediaInput.ts'

export type BannerUpdateDTOPosition = 'HOME_TOP' | 'FEATURED_CONTENT'

export type BannerUpdateDTOAction = 'NONE' | 'SMART_SEARCH' | 'CUSTOM' | 'SEND_TO_WHATSAPP'

export type BannerUpdateInput = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type string | undefined
   */
  position?: BannerUpdateDTOPosition
  /**
   * @type number | undefined
   */
  order?: number
  /**
   * @type string
   */
  title?: string | null
  /**
   * @type string
   */
  description?: string | null
  /**
   * @type string | undefined
   */
  action?: BannerUpdateDTOAction
  /**
   * @type string
   */
  actionButtonText?: string | null
  /**
   * @type string
   */
  actionButtonLink?: string | null
  /**
   * @type array | undefined
   */
  medias?: BannerMediaInput[]
  /**
   * @description ISO format
   * @type string
   */
  startAt?: string | null
  /**
   * @description ISO format
   * @type string
   */
  endAt?: string | null
}