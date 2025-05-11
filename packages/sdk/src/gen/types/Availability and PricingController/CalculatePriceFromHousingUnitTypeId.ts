import type { CalculatePriceBody } from '../CalculatePriceBody.ts'
import type { HousingUnitTypeAvailAndPriceInput } from '../HousingUnitTypeAvailAndPriceInput.ts'

export type CalculatePriceFromHousingUnitTypeIdPathParams = {
  /**
   * @type string
   */
  housingUnitTypeId: string
  /**
   * @type string
   */
  companyId: string
}

/**
 * @description Summary of price data for a housing unit type
 */
export type CalculatePriceFromHousingUnitTypeId200 = HousingUnitTypeAvailAndPriceInput

export type CalculatePriceFromHousingUnitTypeIdMutationRequest = CalculatePriceBody

export type CalculatePriceFromHousingUnitTypeIdMutationResponse = CalculatePriceFromHousingUnitTypeId200

export type CalculatePriceFromHousingUnitTypeIdMutation = {
  Response: CalculatePriceFromHousingUnitTypeId200
  Request: CalculatePriceFromHousingUnitTypeIdMutationRequest
  PathParams: CalculatePriceFromHousingUnitTypeIdPathParams
  Errors: any
}