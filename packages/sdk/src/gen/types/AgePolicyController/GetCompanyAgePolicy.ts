import type { AgePolicyFull } from '../AgePolicyFull.ts'

export type GetCompanyAgePolicyPathParams = {
  /**
   * @description Company ID
   * @type string
   */
  companyId: string
}

/**
 * @description Age policy found or null
 */
export type GetCompanyAgePolicy200 = AgePolicyFull | null

export type GetCompanyAgePolicyQueryResponse = GetCompanyAgePolicy200

export type GetCompanyAgePolicyQuery = {
  Response: GetCompanyAgePolicy200
  PathParams: GetCompanyAgePolicyPathParams
  Errors: any
}