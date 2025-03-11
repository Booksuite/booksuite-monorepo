import type { DateRangeInput } from './DateRangeInput.ts'

export enum ReservationSearchFilterDTOSaleChannel {
  'RECEPTION' = 'RECEPTION',
  'PHONE' = 'PHONE',
  'WHATSAPP' = 'WHATSAPP',
  'INSTAGRAM' = 'INSTAGRAM',
  'TIKTOK' = 'TIKTOK',
  'EMAIL' = 'EMAIL',
  'BOOKSUITE' = 'BOOKSUITE',
  'OTHER' = 'OTHER',
}

export enum ReservationSearchFilterDTOStatus {
  'WAITING_PAYMENT' = 'WAITING_PAYMENT',
  'CONFIRMED' = 'CONFIRMED',
  'CHECKED_IN' = 'CHECKED_IN',
  'CHECKED_OUT' = 'CHECKED_OUT',
  'ABANDONED' = 'ABANDONED',
  'CANCELLED' = 'CANCELLED',
  'PAYMENT_FAILED' = 'PAYMENT_FAILED',
  'OVERBOOKED' = 'OVERBOOKED',
  'WAITING_LIST' = 'WAITING_LIST',
}

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