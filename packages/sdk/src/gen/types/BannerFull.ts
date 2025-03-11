import type { BannerMedia } from './BannerMedia.ts'

export enum BannerResponseFullDTOPosition {
  'HOME_TOP' = 'HOME_TOP',
  'FEATURED_CONTENT' = 'FEATURED_CONTENT',
}

export enum BannerResponseFullDTOAction {
  'NONE' = 'NONE',
  'SMART_SEARCH' = 'SMART_SEARCH',
  'CUSTOM' = 'CUSTOM',
  'SEND_TO_WHATSAPP' = 'SEND_TO_WHATSAPP',
}

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
   * @type object
   */
  order: object
  /**
   * @type object | undefined
   */
  title?: object
  /**
   * @type object | undefined
   */
  description?: object
  /**
   * @type string
   */
  action: BannerResponseFullDTOAction
  /**
   * @type object | undefined
   */
  actionButtonText?: object
  /**
   * @type object | undefined
   */
  actionButtonLink?: object
  /**
   * @description ISO format
   * @type object | undefined
   */
  startAt?: object
  /**
   * @description ISO format
   * @type object | undefined
   */
  endAt?: object
  /**
   * @type array
   */
  medias: BannerMedia[]
}