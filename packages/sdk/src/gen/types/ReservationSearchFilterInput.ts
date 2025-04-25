import type { DateRangeInput } from './DateRangeInput.ts'
import type { ReservationSaleChannel } from './ReservationSaleChannel.ts'
import type { ReservationStatus } from './ReservationStatus.ts'

export type ReservationSearchFilterInput = {
  saleChannel?: ReservationSaleChannel
  /**
   * @type string | undefined
   */
  sellerUserId?: string
  /**
   * @type string | undefined
   */
  guestUserId?: string
  /**
   * @type object | undefined
   */
  dateRange?: DateRangeInput
  /**
   * @type object | undefined
   */
  createdDate?: DateRangeInput
  /**
   * @type array | undefined
   */
  status?: ReservationStatus[]
}