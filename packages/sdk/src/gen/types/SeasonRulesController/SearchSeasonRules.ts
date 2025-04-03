import type { SeasonRulePaginated } from '../SeasonRulePaginated.ts'
import type { SeasonRuleSearchBodyInput } from '../SeasonRuleSearchBodyInput.ts'

export type SearchSeasonRulesPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchSeasonRulesQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchSeasonRules200 = SeasonRulePaginated

export type SearchSeasonRulesMutationRequest = SeasonRuleSearchBodyInput

export type SearchSeasonRulesMutationResponse = SearchSeasonRules200

export type SearchSeasonRulesMutation = {
  Response: SearchSeasonRules200
  Request: SearchSeasonRulesMutationRequest
  PathParams: SearchSeasonRulesPathParams
  QueryParams: SearchSeasonRulesQueryParams
  Errors: any
}