export const FacilityOrderByDTOOrderBy = {
  name: 'name',
  createdAt: 'createdAt',
} as const

type FacilityOrderByDTOOrderBy = (typeof FacilityOrderByDTOOrderBy)[keyof typeof FacilityOrderByDTOOrderBy]

export const FacilityOrderByDTODirection = {
  asc: 'asc',
  desc: 'desc',
} as const

type FacilityOrderByDTODirection = (typeof FacilityOrderByDTODirection)[keyof typeof FacilityOrderByDTODirection]

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