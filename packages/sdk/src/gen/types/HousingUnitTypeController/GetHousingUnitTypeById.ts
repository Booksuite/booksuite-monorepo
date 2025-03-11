import type { HousingUnitTypeFull } from '../HousingUnitTypeFull.ts'

export type GetHousingUnitTypeByIdPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type GetHousingUnitTypeById200 = HousingUnitTypeFull

export type GetHousingUnitTypeByIdQueryResponse = GetHousingUnitTypeById200

export type GetHousingUnitTypeByIdQuery = {
  Response: GetHousingUnitTypeById200
  PathParams: GetHousingUnitTypeByIdPathParams
  Errors: any
}