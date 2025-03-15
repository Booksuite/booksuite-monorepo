import type { ReservationServiceCreateInput } from './ReservationServiceCreateInput.ts'

export type ReservationCreateDTOStatus =
  | 'WAITING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'ABANDONED'
  | 'CANCELLED'
  | 'PAYMENT_FAILED'
  | 'OVERBOOKED'
  | 'WAITING_LIST'

export type ReservationCreateDTOSaleChannel = 'RECEPTION' | 'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'TIKTOK' | 'EMAIL' | 'BOOKSUITE' | 'OTHER'

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