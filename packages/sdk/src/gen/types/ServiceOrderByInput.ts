export const ServiceOrderByDTOOrderBy = {
  name: 'name',
  included: 'included',
  createdAt: 'createdAt',
} as const

type ServiceOrderByDTOOrderBy = (typeof ServiceOrderByDTOOrderBy)[keyof typeof ServiceOrderByDTOOrderBy]

export const ServiceOrderByDTODirection = {
  asc: 'asc',
  desc: 'desc',
} as const

type ServiceOrderByDTODirection = (typeof ServiceOrderByDTODirection)[keyof typeof ServiceOrderByDTODirection]

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