export enum HousingUnitTypeOrderByDTOOrderBy {
  'name' = 'name',
  'description' = 'description',
  'shortDescription' = 'shortDescription',
  'housingUnits' = 'housingUnits',
}

export enum HousingUnitTypeOrderByDTOOrder {
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
  order: HousingUnitTypeOrderByDTOOrder
}