import type { HousingUnitType } from '../HousingUnitType.ts'
import type { HousingUnitTypeCreateInput } from '../HousingUnitTypeCreateInput.ts'

export type CreateHousingUnitTypePathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type CreateHousingUnitType200 = HousingUnitType

export type CreateHousingUnitTypeMutationRequest = HousingUnitTypeCreateInput

export type CreateHousingUnitTypeMutationResponse = CreateHousingUnitType200

export type CreateHousingUnitTypeMutation = {
  Response: CreateHousingUnitType200
  Request: CreateHousingUnitTypeMutationRequest
  PathParams: CreateHousingUnitTypePathParams
  Errors: any
}