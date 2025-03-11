export enum BannerOrderByDTOOrderBy {
  'position' = 'position',
  'order' = 'order',
  'createdAt' = 'createdAt',
  'updatedAt' = 'updatedAt',
}

export enum BannerOrderByDTOOrder {
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
  order: BannerOrderByDTOOrder
}