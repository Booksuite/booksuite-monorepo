export enum ServiceOrderByDTOOrderBy {
  'name' = 'name',
  'description' = 'description',
  'included' = 'included',
  'notes' = 'notes',
}

export enum ServiceOrderByDTOOrder {
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
  order: ServiceOrderByDTOOrder
}