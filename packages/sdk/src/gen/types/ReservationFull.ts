import type { HousingUnit } from './HousingUnit.ts'
import type { ReservationService } from './ReservationService.ts'
import type { User } from './User.ts'

export type ReservationResponseFullDTOStatus =
  | 'WAITING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'ABANDONED'
  | 'CANCELLED'
  | 'PAYMENT_FAILED'
  | 'OVERBOOKED'
  | 'WAITING_LIST'

export type ReservationResponseFullDTOSaleChannel = 'RECEPTION' | 'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'TIKTOK' | 'EMAIL' | 'BOOKSUITE' | 'OTHER'

export type ReservationFull = {
  /**
   * @type string
   */
  status: ReservationResponseFullDTOStatus
  /**
   * @type string
   */
  saleChannel: ReservationResponseFullDTOSaleChannel
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
  totalDays: number | null
  /**
   * @type number
   */
  adults: number | null
  /**
   * @type number
   */
  children: number | null
  /**
   * @type string
   */
  notes: string
  /**
   * @type string, date-time
   */
  createdAt: string
  /**
   * @type string, date-time
   */
  updatedAt: string
  /**
   * @type object
   */
  housingUnit: HousingUnit
  /**
   * @type array
   */
  services: ReservationService[]
  guestUser: User | null
  sellerUser: User | null
}