/* eslint-disable no-alert, no-console */
import { getCalendar } from './getCalendar.ts'
import { getCalendarFromHousingUnitTypeId } from './getCalendarFromHousingUnitTypeId.ts'

export function availabilityAndPricingService() {
  return { getCalendarFromHousingUnitTypeId, getCalendar }
}