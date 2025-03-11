export enum MediaOrderByDTOOrderBy {
  'url' = 'url',
  'createdAt' = 'createdAt',
}

export enum MediaOrderByDTOOrder {
  'asc' = 'asc',
  'desc' = 'desc',
}

export type MediaOrderByInput = {
  /**
   * @type string
   */
  orderBy: MediaOrderByDTOOrderBy
  /**
   * @type string
   */
  order: MediaOrderByDTOOrder
}