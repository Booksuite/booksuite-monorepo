import type { CalendarBodyInput } from '../CalendarBodyInput.ts'
import type { HousingUnitTypeWithCalendarInput } from '../HousingUnitTypeWithCalendarInput.ts'

export type GetCalendarFromHousingUnitTypeIdPathParams = {
  /**
   * @description Housing unit type ID
   * @type string
   */
  housingUnitTypeId: string
  companyId: any
}

/**
 * @description Calendar data for the housing unit type
 */
export type GetCalendarFromHousingUnitTypeId200 = HousingUnitTypeWithCalendarInput

export type GetCalendarFromHousingUnitTypeIdMutationRequest = CalendarBodyInput

export type GetCalendarFromHousingUnitTypeIdMutationResponse = GetCalendarFromHousingUnitTypeId200

export type GetCalendarFromHousingUnitTypeIdMutation = {
  Response: GetCalendarFromHousingUnitTypeId200
  Request: GetCalendarFromHousingUnitTypeIdMutationRequest
  PathParams: GetCalendarFromHousingUnitTypeIdPathParams
  Errors: any
}