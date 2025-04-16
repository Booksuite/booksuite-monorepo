import type { AvailabilityAndPricing } from '../AvailabilityAndPricing.ts'
import type { CalendarBodyInput } from '../CalendarBodyInput.ts'

export type GetCalendarPathParams = {
  /**
   * @type string
   */
  companyId: string
}

/**
 * @description Calendar data for all housing unit types
 */
export type GetCalendar200 = AvailabilityAndPricing[]

export type GetCalendarMutationRequest = CalendarBodyInput

export type GetCalendarMutationResponse = GetCalendar200

export type GetCalendarMutation = {
  Response: GetCalendar200
  Request: GetCalendarMutationRequest
  PathParams: GetCalendarPathParams
  Errors: any
}