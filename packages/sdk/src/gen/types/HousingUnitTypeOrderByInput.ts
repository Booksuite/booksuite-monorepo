export const HousingUnitTypeOrderByDTOOrderBy = {
  name: 'name',
  description: 'description',
  shortDescription: 'shortDescription',
  housingUnits: 'housingUnits',
  createdAt: 'createdAt',
} as const

type HousingUnitTypeOrderByDTOOrderBy = (typeof HousingUnitTypeOrderByDTOOrderBy)[keyof typeof HousingUnitTypeOrderByDTOOrderBy]

export const HousingUnitTypeOrderByDTODirection = {
  asc: 'asc',
  desc: 'desc',
} as const

type HousingUnitTypeOrderByDTODirection = (typeof HousingUnitTypeOrderByDTODirection)[keyof typeof HousingUnitTypeOrderByDTODirection]

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