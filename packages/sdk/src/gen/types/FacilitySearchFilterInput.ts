export type FacilitySearchFilterDTOType = 'HOUSING_UNIT_TYPE' | 'COMPANY'

export type FacilitySearchFilterInput = {
  /**
   * @type string | undefined
   */
  type?: FacilitySearchFilterDTOType
}