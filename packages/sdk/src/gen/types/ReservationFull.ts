import type { HousingUnit } from './HousingUnit.ts'
import type { HousingUnitType } from './HousingUnitType.ts'
import type { RateOptionFull } from './RateOptionFull.ts'
import type { ReservationAgeGroup } from './ReservationAgeGroup.ts'
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
   * @description Base price for the day
   * @type number
   */
  basePrice: number
  /**
   * @description Services price for the day
   * @type number
   */
  servicesPrice: number
  /**
   * @description Children price for the day
   * @type number
   */
  childrenPrice: number
  /**
   * @description Rate option price for the day
   * @type number
   */
  rateOptionPrice: number
  /**
   * @description Final price for the day
   * @type number
   */
  finalPrice: number
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  status: ReservationResponseFullDTOStatus
  /**
   * @type string
   */
  saleChannel: ReservationResponseFullDTOSaleChannel
  /**
   * @type string, date
   */
  startDate: string
  /**
   * @type string, date
   */
  endDate: string
  /**
   * @type number
   */
  adults: number
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
   * @type string
   */
  reservationCode: string
  /**
   * @type string
   */
  sellerUserId: string | null
  /**
   * @type string
   */
  guestUserId: string
  /**
   * @type string
   */
  companyId: string
  /**
   * @type string
   */
  housingUnitId: string | null
  /**
   * @type string
   */
  housingUnitTypeId: string | null
  /**
   * @type string
   */
  rateOptionId: string | null
  /**
   * @type string, date-time
   */
  deletedAt: string | null
  housingUnit: HousingUnit | null
  /**
   * @type object
   */
  guestUser: User
  /**
   * @type array
   */
  services: ReservationService[]
  sellerUser: User | null
  /**
   * @type array
   */
  ageGroups: ReservationAgeGroup[]
  rateOption: RateOptionFull | null
  housingUnitType: HousingUnitType | null
}