export type ServiceOrderByDTOOrderBy = 'name' | 'included' | 'createdAt'

export type ServiceOrderByDTODirection = 'asc' | 'desc'

export type ServiceOrderByInput = {
  /**
   * @type string
   */
  orderBy: ServiceOrderByDTOOrderBy
  /**
   * @type string
   */
  direction: ServiceOrderByDTODirection
}