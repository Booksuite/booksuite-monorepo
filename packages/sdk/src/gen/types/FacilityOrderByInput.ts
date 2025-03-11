export enum FacilityOrderByDTOOrderBy {
  'name' = 'name',
  'createdAt' = 'createdAt',
  'updatedAt' = 'updatedAt',
}

export enum FacilityOrderByDTOOrder {
  'asc' = 'asc',
  'desc' = 'desc',
}

export type FacilityOrderByInput = {
  /**
   * @type string
   */
  orderBy: FacilityOrderByDTOOrderBy
  /**
   * @type string
   */
  order: FacilityOrderByDTOOrder
}