export type MediaOrderByDTOOrderBy = 'url' | 'createdAt'

export type MediaOrderByDTODirection = 'asc' | 'desc'

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