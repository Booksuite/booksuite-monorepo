export type FacilityOrderByDTOOrderBy = 'name' | 'createdAt'

export type FacilityOrderByDTODirection = 'asc' | 'desc'

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