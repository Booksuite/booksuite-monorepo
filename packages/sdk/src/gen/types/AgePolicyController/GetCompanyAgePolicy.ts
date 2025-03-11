import type { AgePolicyFull } from '../AgePolicyFull.ts'

export type GetCompanyAgePolicyPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type GetCompanyAgePolicy200 = AgePolicyFull | null

export type GetCompanyAgePolicyQueryResponse = GetCompanyAgePolicy200

export type GetCompanyAgePolicyQuery = {
  Response: GetCompanyAgePolicy200
  PathParams: GetCompanyAgePolicyPathParams
  Errors: any
}