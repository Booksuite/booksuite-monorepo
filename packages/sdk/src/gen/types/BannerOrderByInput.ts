export const BannerOrderByDTOOrderBy = {
  position: 'position',
  order: 'order',
  createdAt: 'createdAt',
} as const

type BannerOrderByDTOOrderBy = (typeof BannerOrderByDTOOrderBy)[keyof typeof BannerOrderByDTOOrderBy]

export const BannerOrderByDTODirection = {
  asc: 'asc',
  desc: 'desc',
} as const

type BannerOrderByDTODirection = (typeof BannerOrderByDTODirection)[keyof typeof BannerOrderByDTODirection]

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