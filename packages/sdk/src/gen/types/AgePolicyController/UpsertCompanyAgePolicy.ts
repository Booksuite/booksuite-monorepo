import type { AgePolicyFull } from '../AgePolicyFull.ts'
import type { AgePolicyInput } from '../AgePolicyInput.ts'

export type UpsertCompanyAgePolicyPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type UpsertCompanyAgePolicy200 = AgePolicyFull

export type UpsertCompanyAgePolicyMutationRequest = AgePolicyInput

export type UpsertCompanyAgePolicyMutationResponse = UpsertCompanyAgePolicy200

export type UpsertCompanyAgePolicyMutation = {
  Response: UpsertCompanyAgePolicy200
  Request: UpsertCompanyAgePolicyMutationRequest
  PathParams: UpsertCompanyAgePolicyPathParams
  Errors: any
}