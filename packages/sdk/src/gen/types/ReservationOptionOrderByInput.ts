import type { OrderDirection } from './OrderDirection.ts'
import type { ReservationOptionOrderBy } from './ReservationOptionOrderBy.ts'

export type ReservationOptionOrderByInput = {
  orderBy: ReservationOptionOrderBy
  direction: OrderDirection
}