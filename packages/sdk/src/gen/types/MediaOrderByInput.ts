export enum MediaOrderByDTOOrderBy {
  'url' = 'url',
  'createdAt' = 'createdAt',
}

export enum MediaOrderByDTODirection {
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
  direction: MediaOrderByDTODirection
}