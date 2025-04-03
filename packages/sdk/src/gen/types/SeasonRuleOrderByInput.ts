import type { OrderDirection } from './OrderDirection.ts'
import type { SeasonRuleOrderBy } from './SeasonRuleOrderBy.ts'

export type SeasonRuleOrderByInput = {
  orderBy: SeasonRuleOrderBy
  direction: OrderDirection
}