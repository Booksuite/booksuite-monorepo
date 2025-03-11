export enum FacilityDTOType {
  'HOUSING_UNIT_TYPE' = 'HOUSING_UNIT_TYPE',
  'COMPANY' = 'COMPANY',
}

export enum FacilityDTOCategory {
  'GENERAL' = 'GENERAL',
  'FOOD_AND_BEVERAGES' = 'FOOD_AND_BEVERAGES',
  'LEISURE_AREAS' = 'LEISURE_AREAS',
  'ACTIVITIES' = 'ACTIVITIES',
  'STRUCTURE' = 'STRUCTURE',
  'LANGUAGES_SPOKEN' = 'LANGUAGES_SPOKEN',
  'INTERNET' = 'INTERNET',
  'SERVICES' = 'SERVICES',
  'BED_TYPES' = 'BED_TYPES',
}

export type FacilityInput = {
  /**
   * @type string | undefined
   */
  id?: string
  /**
   * @type string
   */
  type: FacilityDTOType
  /**
   * @type string
   */
  category: FacilityDTOCategory
  /**
   * @type string
   */
  name: string
  /**
   * @type object | undefined
   */
  icon?: object
}