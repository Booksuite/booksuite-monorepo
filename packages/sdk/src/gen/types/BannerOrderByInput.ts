export enum BannerOrderByDTOOrderBy {
  'position' = 'position',
  'order' = 'order',
  'createdAt' = 'createdAt',
}

export enum BannerOrderByDTODirection {
  'asc' = 'asc',
  'desc' = 'desc',
}

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