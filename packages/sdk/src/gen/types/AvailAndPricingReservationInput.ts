import type { HousingUnit } from './HousingUnit.ts'
import type { ReservationSaleChannel } from './ReservationSaleChannel.ts'
import type { ReservationStatus } from './ReservationStatus.ts'

export type AvailAndPricingReservationInput = {
  /**
   * @description The ID of the reservation
   * @type string
   */
  id: string
  /**
   * @description The status of the reservation
   */
  status: ReservationStatus
  /**
   * @description The notes of the reservation
   * @type string
   */
  notes: string
  /**
   * @description The reservation code
   * @type string
   */
  reservationCode: string
  /**
   * @description The start date of the reservation
   * @type string, date
   */
  startDate: string
  /**
   * @description The end date of the reservation
   * @type string, date
   */
  endDate: string
  /**
   * @description The total days of the reservation
   * @type number
   */
  totalDays: number | null
  /**
   * @description The adults of the reservation
   * @type number
   */
  adults: number
  /**
   * @description The sale channel of the reservation
   */
  saleChannel: ReservationSaleChannel
  /**
   * @description The seller user ID of the reservation
   * @type string
   */
  sellerUserId: string | null
  /**
   * @description The guest user ID of the reservation
   * @type string
   */
  guestUserId: string | null
  /**
   * @description The company ID of the reservation
   * @type string
   */
  companyId: string
  /**
   * @description The housing unit ID of the reservation
   * @type string
   */
  housingUnitId: string | null
  /**
   * @description The created at date of the reservation
   * @type string, date-time
   */
  createdAt: string
  /**
   * @description The updated at date of the reservation
   * @type string, date-time
   */
  updatedAt: string
  /**
   * @description The deleted at date of the reservation
   * @type string, date-time
   */
  deletedAt: string | null
  /**
   * @description The user ID of the reservation
   * @type string
   */
  userId: string | null
  /**
   * @description The housing unit of the reservation
   */
  housingUnit: HousingUnit | null
}