import type { OrderDirection } from './OrderDirection.ts'
import type { ServiceOrderBy } from './ServiceOrderBy.ts'

export type ServiceOrderByInput = {
  orderBy: ServiceOrderBy
  direction: OrderDirection
}