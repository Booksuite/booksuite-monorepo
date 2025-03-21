import type { OrderDirection } from './OrderDirection.ts'

export type HousingUnitTypeOrderByDTOOrderBy = 'name' | 'description' | 'shortDescription' | 'housingUnits' | 'createdAt'

export type HousingUnitTypeOrderByInput = {
  /**
   * @type string
   */
  orderBy: HousingUnitTypeOrderByDTOOrderBy
  direction: OrderDirection
}