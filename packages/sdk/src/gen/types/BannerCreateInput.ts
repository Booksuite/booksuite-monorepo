import type { BannerMediaInput } from './BannerMediaInput.ts'

export const BannerCreateDTOPosition = {
  HOME_TOP: 'HOME_TOP',
  FEATURED_CONTENT: 'FEATURED_CONTENT',
} as const

type BannerCreateDTOPosition = (typeof BannerCreateDTOPosition)[keyof typeof BannerCreateDTOPosition]

export const BannerCreateDTOAction = {
  NONE: 'NONE',
  SMART_SEARCH: 'SMART_SEARCH',
  CUSTOM: 'CUSTOM',
  SEND_TO_WHATSAPP: 'SEND_TO_WHATSAPP',
} as const

type BannerCreateDTOAction = (typeof BannerCreateDTOAction)[keyof typeof BannerCreateDTOAction]

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