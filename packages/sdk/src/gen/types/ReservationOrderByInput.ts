import type { OrderDirection } from './OrderDirection.ts'
import type { ReservationOrderBy } from './ReservationOrderBy.ts'

export type ReservationOrderByInput = {
  orderBy: ReservationOrderBy
  direction: OrderDirection
}