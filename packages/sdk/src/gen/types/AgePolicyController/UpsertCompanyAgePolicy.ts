import type { AgePolicyFull } from '../AgePolicyFull.ts'
import type { AgePolicyInput } from '../AgePolicyInput.ts'

export type UpsertCompanyAgePolicyPathParams = {
  /**
   * @description Company ID
   * @type string
   */
  companyId: string
}

/**
 * @description Age policy created or updated
 */
export type UpsertCompanyAgePolicy200 = AgePolicyFull

export type UpsertCompanyAgePolicyMutationRequest = AgePolicyInput

export type UpsertCompanyAgePolicyMutationResponse = UpsertCompanyAgePolicy200

export type UpsertCompanyAgePolicyMutation = {
  Response: UpsertCompanyAgePolicy200
  Request: UpsertCompanyAgePolicyMutationRequest
  PathParams: UpsertCompanyAgePolicyPathParams
  Errors: any
}