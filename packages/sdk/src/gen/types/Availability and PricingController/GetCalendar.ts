import type { CalendarBodyInput } from '../CalendarBodyInput.ts'
import type { HousingUnitTypeWithCalendarInput } from '../HousingUnitTypeWithCalendarInput.ts'

export type GetCalendarPathParams = {
  /**
   * @type string
   */
  companyId: string
}

/**
 * @description Calendar data for all housing unit types
 */
export type GetCalendar200 = HousingUnitTypeWithCalendarInput[]

export type GetCalendarMutationRequest = CalendarBodyInput

export type GetCalendarMutationResponse = GetCalendar200

export type GetCalendarMutation = {
  Response: GetCalendar200
  Request: GetCalendarMutationRequest
  PathParams: GetCalendarPathParams
  Errors: any
}