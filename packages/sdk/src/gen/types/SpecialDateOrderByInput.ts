import type { OrderDirection } from './OrderDirection.ts'
import type { SpecialDateOrderBy } from './SpecialDateOrderBy.ts'

export type SpecialDateOrderByInput = {
  orderBy: SpecialDateOrderBy
  direction: OrderDirection
}