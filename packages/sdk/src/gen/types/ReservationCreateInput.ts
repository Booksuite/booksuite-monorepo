import type { ReservationServiceCreateInput } from './ReservationServiceCreateInput.ts'

export enum ReservationCreateDTOStatus {
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

export enum ReservationCreateDTOSaleChannel {
  'RECEPTION' = 'RECEPTION',
  'PHONE' = 'PHONE',
  'WHATSAPP' = 'WHATSAPP',
  'INSTAGRAM' = 'INSTAGRAM',
  'TIKTOK' = 'TIKTOK',
  'EMAIL' = 'EMAIL',
  'BOOKSUITE' = 'BOOKSUITE',
  'OTHER' = 'OTHER',
}

export type ReservationCreateInput = {
  /**
   * @type string
   */
  status: ReservationCreateDTOStatus
  /**
   * @type string
   */
  userId: string
  /**
   * @type string
   */
  sellerUserId: string
  /**
   * @type string | undefined
   */
  saleChannel?: ReservationCreateDTOSaleChannel
  /**
   * @type string, date-time
   */
  startDate: string
  /**
   * @type string, date-time
   */
  endDate: string
  /**
   * @type number
   */
  totalDays: number
  /**
   * @type number
   */
  adults: number
  /**
   * @type number
   */
  children: number
  /**
   * @type string
   */
  notes: string
  /**
   * @type string
   */
  housingUnitId: string
  /**
   * @type array
   */
  services: ReservationServiceCreateInput[]
}