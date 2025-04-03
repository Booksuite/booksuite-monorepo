import type { SeasonRule } from '../SeasonRule.ts'
import type { SeasonRuleInput } from '../SeasonRuleInput.ts'

export type SeasonRulesControllerCreatePathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SeasonRulesControllerCreate200 = SeasonRule

export type SeasonRulesControllerCreateMutationRequest = SeasonRuleInput

export type SeasonRulesControllerCreateMutationResponse = SeasonRulesControllerCreate200

export type SeasonRulesControllerCreateMutation = {
  Response: SeasonRulesControllerCreate200
  Request: SeasonRulesControllerCreateMutationRequest
  PathParams: SeasonRulesControllerCreatePathParams
  Errors: any
}