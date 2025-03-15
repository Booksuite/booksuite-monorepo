export type BannerOrderByDTOOrderBy = 'position' | 'order' | 'createdAt'

export type BannerOrderByDTODirection = 'asc' | 'desc'

export type BannerOrderByInput = {
  /**
   * @type string
   */
  orderBy: BannerOrderByDTOOrderBy
  /**
   * @type string
   */
  direction: BannerOrderByDTODirection
}