import type { ReservationAgeGroupInput } from './ReservationAgeGroupInput.ts'
import type { ReservationReservationOptionInput } from './ReservationReservationOptionInput.ts'
import type { ReservationServiceInput } from './ReservationServiceInput.ts'

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
   * @type array
   */
  ageGroups: ReservationAgeGroupInput[]
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
  services: ReservationServiceInput[]
  /**
   * @type array
   */
  reservationOption: ReservationReservationOptionInput[]
}