import type { Facility } from '../Facility.ts'

export type GetFacilityByIdPathParams = {
  /**
   * @type string
   */
  id: string
}

export type GetFacilityById200 = Facility | null

export type GetFacilityByIdQueryResponse = GetFacilityById200

export type GetFacilityByIdQuery = {
  Response: GetFacilityById200
  PathParams: GetFacilityByIdPathParams
  Errors: any
}