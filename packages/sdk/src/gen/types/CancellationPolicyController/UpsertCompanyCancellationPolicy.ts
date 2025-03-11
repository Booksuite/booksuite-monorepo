import type { CancellationPolicyFull } from '../CancellationPolicyFull.ts'
import type { CancellationPolicyInput } from '../CancellationPolicyInput.ts'

export type UpsertCompanyCancellationPolicyPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type UpsertCompanyCancellationPolicy200 = CancellationPolicyFull

export type UpsertCompanyCancellationPolicyMutationRequest = CancellationPolicyInput

export type UpsertCompanyCancellationPolicyMutationResponse = UpsertCompanyCancellationPolicy200

export type UpsertCompanyCancellationPolicyMutation = {
  Response: UpsertCompanyCancellationPolicy200
  Request: UpsertCompanyCancellationPolicyMutationRequest
  PathParams: UpsertCompanyCancellationPolicyPathParams
  Errors: any
}