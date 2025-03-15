export type HousingUnitTypeOrderByDTOOrderBy = 'name' | 'description' | 'shortDescription' | 'housingUnits' | 'createdAt'

export type HousingUnitTypeOrderByDTODirection = 'asc' | 'desc'

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