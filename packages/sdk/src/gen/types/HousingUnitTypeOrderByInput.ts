export enum HousingUnitTypeOrderByDTOOrderBy {
  'name' = 'name',
  'description' = 'description',
  'shortDescription' = 'shortDescription',
  'housingUnits' = 'housingUnits',
  'createdAt' = 'createdAt',
}

export enum HousingUnitTypeOrderByDTODirection {
  'asc' = 'asc',
  'desc' = 'desc',
}

export type HousingUnitTypeOrderByInput = {
  /**
   * @type string
   */
  orderBy: HousingUnitTypeOrderByDTOOrderBy
  /**
   * @type string
   */
  direction: HousingUnitTypeOrderByDTODirection
}