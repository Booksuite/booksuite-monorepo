import type { HousingUnitType } from '../HousingUnitType.ts'
import type { HousingUnitTypeUpdateInput } from '../HousingUnitTypeUpdateInput.ts'

export type UpdateHousingUnitTypePathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type UpdateHousingUnitType200 = HousingUnitType

export type UpdateHousingUnitTypeMutationRequest = HousingUnitTypeUpdateInput

export type UpdateHousingUnitTypeMutationResponse = UpdateHousingUnitType200

export type UpdateHousingUnitTypeMutation = {
  Response: UpdateHousingUnitType200
  Request: UpdateHousingUnitTypeMutationRequest
  PathParams: UpdateHousingUnitTypePathParams
  Errors: any
}