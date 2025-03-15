import type { BannerMediaInput } from './BannerMediaInput.ts'

export type BannerCreateDTOPosition = 'HOME_TOP' | 'FEATURED_CONTENT'

export type BannerCreateDTOAction = 'NONE' | 'SMART_SEARCH' | 'CUSTOM' | 'SEND_TO_WHATSAPP'

export type BannerCreateInput = {
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
  position: BannerCreateDTOPosition
  /**
   * @type number
   */
  order: number
  /**
   * @type string | undefined
   */
  title?: string
  /**
   * @type string | undefined
   */
  description?: string
  /**
   * @type string
   */
  action: BannerCreateDTOAction
  /**
   * @type string | undefined
   */
  actionButtonText?: string
  /**
   * @type string | undefined
   */
  actionButtonLink?: string
  /**
   * @type array
   */
  medias: BannerMediaInput[]
  /**
   * @description ISO format
   * @type string | undefined
   */
  startAt?: string
  /**
   * @description ISO format
   * @type string | undefined
   */
  endAt?: string
}