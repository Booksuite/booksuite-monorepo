import type { ReservationServiceInput } from './ReservationServiceInput.ts'

export type ReservationUpdateDTOStatus =
  | 'WAITING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'ABANDONED'
  | 'CANCELLED'
  | 'PAYMENT_FAILED'
  | 'OVERBOOKED'
  | 'WAITING_LIST'

export type ReservationUpdateDTOSaleChannel = 'RECEPTION' | 'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'TIKTOK' | 'EMAIL' | 'BOOKSUITE' | 'OTHER'

export type ReservationUpdateInput = {
  /**
   * @type string | undefined
   */
  status?: ReservationUpdateDTOStatus
  /**
   * @type string | undefined
   */
  userId?: string
  /**
   * @type string
   */
  sellerUserId?: string | null
  /**
   * @type string | undefined
   */
  saleChannel?: ReservationUpdateDTOSaleChannel
  /**
   * @type string | undefined
   */
  startDate?: string
  /**
   * @type string | undefined
   */
  endDate?: string
  /**
   * @type number
   */
  totalDays?: number | null
  /**
   * @type number | undefined
   */
  adults?: number
  /**
   * @type number | undefined
   */
  children?: number
  /**
   * @type string | undefined
   */
  notes?: string
  /**
   * @type string
   */
  housingUnitId?: string | null
  /**
   * @type array | undefined
   */
  services?: ReservationServiceInput[]
}