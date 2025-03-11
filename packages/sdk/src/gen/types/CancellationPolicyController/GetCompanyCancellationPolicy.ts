import type { CancellationPolicyFull } from '../CancellationPolicyFull.ts'

export type GetCompanyCancellationPolicyPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type GetCompanyCancellationPolicy200 = CancellationPolicyFull | null

export type GetCompanyCancellationPolicyQueryResponse = GetCompanyCancellationPolicy200

export type GetCompanyCancellationPolicyQuery = {
  Response: GetCompanyCancellationPolicy200
  PathParams: GetCompanyCancellationPolicyPathParams
  Errors: any
}