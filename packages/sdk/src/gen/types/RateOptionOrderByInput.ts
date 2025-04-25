import type { OrderDirection } from './OrderDirection.ts'
import type { RateOptionOrderBy } from './RateOptionOrderBy.ts'

export type RateOptionOrderByInput = {
  orderBy: RateOptionOrderBy
  direction: OrderDirection
}