export enum CompanyOrderByDTOOrderBy {
  'name' = 'name',
  'shortDescription' = 'shortDescription',
  'description' = 'description',
  'companyName' = 'companyName',
  'state' = 'state',
  'city' = 'city',
  'user' = 'user',
}

export enum CompanyOrderByDTOOrder {
  'asc' = 'asc',
  'desc' = 'desc',
}

export type CompanyOrderByInput = {
  /**
   * @type string
   */
  orderBy: CompanyOrderByDTOOrderBy
  /**
   * @type string
   */
  order: CompanyOrderByDTOOrder
}