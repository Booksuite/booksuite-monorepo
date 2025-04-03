/* eslint-disable no-alert, no-console */
import { reservationOptionsControllerCreate } from './reservationOptionsControllerCreate.ts'
import { reservationOptionsControllerGetById } from './reservationOptionsControllerGetById.ts'
import { reservationOptionsControllerUpdate } from './reservationOptionsControllerUpdate.ts'
import { searchReservationOption } from './searchReservationOption.ts'

export function reservationOptionsService() {
  return { reservationOptionsControllerGetById, reservationOptionsControllerUpdate, reservationOptionsControllerCreate, searchReservationOption }
}