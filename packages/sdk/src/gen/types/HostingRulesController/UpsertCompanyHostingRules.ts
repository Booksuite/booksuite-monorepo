import type { HostingRulesInput } from '../HostingRulesInput.ts'

export type UpsertCompanyHostingRulesPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type UpsertCompanyHostingRules200 = HostingRulesInput

export type UpsertCompanyHostingRulesMutationRequest = HostingRulesInput

export type UpsertCompanyHostingRulesMutationResponse = UpsertCompanyHostingRules200

export type UpsertCompanyHostingRulesMutation = {
  Response: UpsertCompanyHostingRules200
  Request: UpsertCompanyHostingRulesMutationRequest
  PathParams: UpsertCompanyHostingRulesPathParams
  Errors: any
}