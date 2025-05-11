/* eslint-disable no-alert, no-console */
import { calculatePrice } from './calculatePrice.ts'
import { calculatePriceFromHousingUnitTypeId } from './calculatePriceFromHousingUnitTypeId.ts'
import { getCalendar } from './getCalendar.ts'
import { getCalendarFromHousingUnitTypeId } from './getCalendarFromHousingUnitTypeId.ts'

export function availabilityAndPricingService() {
  return { getCalendarFromHousingUnitTypeId, getCalendar, calculatePriceFromHousingUnitTypeId, calculatePrice }
}