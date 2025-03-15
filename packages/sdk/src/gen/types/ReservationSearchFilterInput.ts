import type { DateRangeInput } from './DateRangeInput.ts'

export type ReservationSearchFilterDTOSaleChannel = 'RECEPTION' | 'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'TIKTOK' | 'EMAIL' | 'BOOKSUITE' | 'OTHER'

export type ReservationSearchFilterDTOStatus =
  | 'WAITING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'ABANDONED'
  | 'CANCELLED'
  | 'PAYMENT_FAILED'
  | 'OVERBOOKED'
  | 'WAITING_LIST'

export type ReservationSearchFilterInput = {
  /**
   * @type string | undefined
   */
  saleChannel?: ReservationSearchFilterDTOSaleChannel
  /**
   * @type string | undefined
   */
  sellerUserId?: string
  /**
   * @type string | undefined
   */
  userId?: string
  /**
   * @type object | undefined
   */
  startDate?: DateRangeInput
  /**
   * @type object | undefined
   */
  endDate?: DateRangeInput
  /**
   * @type object | undefined
   */
  createdDate?: DateRangeInput
  /**
   * @type string | undefined
   */
  status?: ReservationSearchFilterDTOStatus
}