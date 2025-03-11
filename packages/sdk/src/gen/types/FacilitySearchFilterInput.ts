export enum FacilitySearchFilterDTOType {
  'HOUSING_UNIT_TYPE' = 'HOUSING_UNIT_TYPE',
  'COMPANY' = 'COMPANY',
}

export type FacilitySearchFilterInput = {
  /**
   * @type string
   */
  type: FacilitySearchFilterDTOType
}