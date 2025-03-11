export enum BannerSearchFilterDTOPosition {
  'HOME_TOP' = 'HOME_TOP',
  'FEATURED_CONTENT' = 'FEATURED_CONTENT',
}

export type BannerSearchFilterInput = {
  /**
   * @type string | undefined
   */
  position?: BannerSearchFilterDTOPosition
}