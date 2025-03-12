export enum FacilityOrderByDTOOrderBy {
  'name' = 'name',
  'createdAt' = 'createdAt',
}

export enum FacilityOrderByDTODirection {
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
  direction: FacilityOrderByDTODirection
}