export type CompanyOrderByDTOOrderBy = 'name' | 'shortDescription' | 'description' | 'companyName' | 'state' | 'city' | 'user' | 'createdAt'

export type CompanyOrderByDTODirection = 'asc' | 'desc'

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