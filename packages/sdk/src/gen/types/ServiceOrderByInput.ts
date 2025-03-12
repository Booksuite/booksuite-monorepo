export enum ServiceOrderByDTOOrderBy {
  'name' = 'name',
  'included' = 'included',
  'createdAt' = 'createdAt',
}

export enum ServiceOrderByDTODirection {
  'asc' = 'asc',
  'desc' = 'desc',
}

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