import type { CalculatePriceBody } from '../CalculatePriceBody.ts'
import type { HousingUnitTypeAvailAndPriceInput } from '../HousingUnitTypeAvailAndPriceInput.ts'

export type CalculatePricePathParams = {
  /**
   * @type string
   */
  companyId: string
}

/**
 * @description Summary of price data for all housing unit types
 */
export type CalculatePrice200 = HousingUnitTypeAvailAndPriceInput[]

export type CalculatePriceMutationRequest = CalculatePriceBody

export type CalculatePriceMutationResponse = CalculatePrice200

export type CalculatePriceMutation = {
  Response: CalculatePrice200
  Request: CalculatePriceMutationRequest
  PathParams: CalculatePricePathParams
  Errors: any
}