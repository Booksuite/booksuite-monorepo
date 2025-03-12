import type { HousingUnit } from './HousingUnit.ts'
import type { ReservationService } from './ReservationService.ts'
import type { User } from './User.ts'

export const ReservationResponseFullDTOStatus = {
  WAITING_PAYMENT: 'WAITING_PAYMENT',
  CONFIRMED: 'CONFIRMED',
  CHECKED_IN: 'CHECKED_IN',
  CHECKED_OUT: 'CHECKED_OUT',
  ABANDONED: 'ABANDONED',
  CANCELLED: 'CANCELLED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  OVERBOOKED: 'OVERBOOKED',
  WAITING_LIST: 'WAITING_LIST',
} as const

type ReservationResponseFullDTOStatus = (typeof ReservationResponseFullDTOStatus)[keyof typeof ReservationResponseFullDTOStatus]

export const ReservationResponseFullDTOSaleChannel = {
  RECEPTION: 'RECEPTION',
  PHONE: 'PHONE',
  WHATSAPP: 'WHATSAPP',
  INSTAGRAM: 'INSTAGRAM',
  TIKTOK: 'TIKTOK',
  EMAIL: 'EMAIL',
  BOOKSUITE: 'BOOKSUITE',
  OTHER: 'OTHER',
} as const

type ReservationResponseFullDTOSaleChannel = (typeof ReservationResponseFullDTOSaleChannel)[keyof typeof ReservationResponseFullDTOSaleChannel]

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