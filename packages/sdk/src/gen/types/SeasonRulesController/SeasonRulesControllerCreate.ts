import type { SeasonRule } from '../SeasonRule.ts'
import type { SeasonRuleCreateInput } from '../SeasonRuleCreateInput.ts'

export type SeasonRulesControllerCreatePathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SeasonRulesControllerCreate200 = SeasonRule

export type SeasonRulesControllerCreateMutationRequest = SeasonRuleCreateInput

export type SeasonRulesControllerCreateMutationResponse = SeasonRulesControllerCreate200

export type SeasonRulesControllerCreateMutation = {
  Response: SeasonRulesControllerCreate200
  Request: SeasonRulesControllerCreateMutationRequest
  PathParams: SeasonRulesControllerCreatePathParams
  Errors: any
}