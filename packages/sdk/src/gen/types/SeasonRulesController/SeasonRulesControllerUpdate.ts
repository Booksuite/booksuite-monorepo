import type { SeasonRuleFull } from '../SeasonRuleFull.ts'
import type { SeasonRuleUpdateInput } from '../SeasonRuleUpdateInput.ts'

export type SeasonRulesControllerUpdatePathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type SeasonRulesControllerUpdate200 = SeasonRuleFull

export type SeasonRulesControllerUpdateMutationRequest = SeasonRuleUpdateInput

export type SeasonRulesControllerUpdateMutationResponse = SeasonRulesControllerUpdate200

export type SeasonRulesControllerUpdateMutation = {
  Response: SeasonRulesControllerUpdate200
  Request: SeasonRulesControllerUpdateMutationRequest
  PathParams: SeasonRulesControllerUpdatePathParams
  Errors: any
}