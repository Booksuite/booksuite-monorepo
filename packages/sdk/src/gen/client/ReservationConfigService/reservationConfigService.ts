/* eslint-disable no-alert, no-console */
import { getCompanyReservationConfig } from './getCompanyReservationConfig.ts'
import { upsertCompanyReservationConfig } from './upsertCompanyReservationConfig.ts'

export function reservationConfigService() {
  return { getCompanyReservationConfig, upsertCompanyReservationConfig }
}