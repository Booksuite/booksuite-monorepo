export const BannerSearchFilterDTOPosition = {
  HOME_TOP: 'HOME_TOP',
  FEATURED_CONTENT: 'FEATURED_CONTENT',
} as const

type BannerSearchFilterDTOPosition = (typeof BannerSearchFilterDTOPosition)[keyof typeof BannerSearchFilterDTOPosition]

export type BannerSearchFilterInput = {
  /**
   * @type string | undefined
   */
  position?: BannerSearchFilterDTOPosition
}