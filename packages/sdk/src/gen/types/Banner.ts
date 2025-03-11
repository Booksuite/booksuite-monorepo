export enum BannerResponseDTOPosition {
  'HOME_TOP' = 'HOME_TOP',
  'FEATURED_CONTENT' = 'FEATURED_CONTENT',
}

export enum BannerResponseDTOAction {
  'NONE' = 'NONE',
  'SMART_SEARCH' = 'SMART_SEARCH',
  'CUSTOM' = 'CUSTOM',
  'SEND_TO_WHATSAPP' = 'SEND_TO_WHATSAPP',
}

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
  action: BannerResponseDTOAction
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
}