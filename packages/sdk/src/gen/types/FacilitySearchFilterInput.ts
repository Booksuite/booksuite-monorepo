export const FacilitySearchFilterDTOType = {
  HOUSING_UNIT_TYPE: 'HOUSING_UNIT_TYPE',
  COMPANY: 'COMPANY',
} as const

type FacilitySearchFilterDTOType = (typeof FacilitySearchFilterDTOType)[keyof typeof FacilitySearchFilterDTOType]

export type FacilitySearchFilterInput = {
  /**
   * @type string | undefined
   */
  type?: FacilitySearchFilterDTOType
}