export const CompanyOrderByDTOOrderBy = {
  name: 'name',
  shortDescription: 'shortDescription',
  description: 'description',
  companyName: 'companyName',
  state: 'state',
  city: 'city',
  user: 'user',
  createdAt: 'createdAt',
} as const

type CompanyOrderByDTOOrderBy = (typeof CompanyOrderByDTOOrderBy)[keyof typeof CompanyOrderByDTOOrderBy]

export const CompanyOrderByDTODirection = {
  asc: 'asc',
  desc: 'desc',
} as const

type CompanyOrderByDTODirection = (typeof CompanyOrderByDTODirection)[keyof typeof CompanyOrderByDTODirection]

export type CompanyOrderByInput = {
  /**
   * @type string
   */
  orderBy: CompanyOrderByDTOOrderBy
  /**
   * @type string
   */
  direction: CompanyOrderByDTODirection
}