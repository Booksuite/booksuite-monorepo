import type { HostingRulesInput } from '../HostingRulesInput.ts'

export type GetCompanyHostingRulesPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type GetCompanyHostingRules200 = HostingRulesInput | null

export type GetCompanyHostingRulesQueryResponse = GetCompanyHostingRules200

export type GetCompanyHostingRulesQuery = {
  Response: GetCompanyHostingRules200
  PathParams: GetCompanyHostingRulesPathParams
  Errors: any
}