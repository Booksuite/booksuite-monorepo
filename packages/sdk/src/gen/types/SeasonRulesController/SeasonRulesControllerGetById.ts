import type { SeasonRuleFull } from '../SeasonRuleFull.ts'

export type SeasonRulesControllerGetByIdPathParams = {
  /**
   * @type string
   */
  id: string
}

export type SeasonRulesControllerGetById200 = SeasonRuleFull | null

export type SeasonRulesControllerGetByIdQueryResponse = SeasonRulesControllerGetById200

export type SeasonRulesControllerGetByIdQuery = {
  Response: SeasonRulesControllerGetById200
  PathParams: SeasonRulesControllerGetByIdPathParams
  Errors: any
}