export enum FacilityResponseDTOType {
  'HOUSING_UNIT_TYPE' = 'HOUSING_UNIT_TYPE',
  'COMPANY' = 'COMPANY',
}

export enum FacilityResponseDTOCategory {
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

export type Facility = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  type: FacilityResponseDTOType
  /**
   * @type string
   */
  category: FacilityResponseDTOCategory
  /**
   * @type string
   */
  name: string
  /**
   * @type object
   */
  icon: object | null
}