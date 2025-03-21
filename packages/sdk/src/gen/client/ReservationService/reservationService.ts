/* eslint-disable no-alert, no-console */
import { createReservation } from './createReservation.ts'
import { deleteReservation } from './deleteReservation.ts'
import { getReservationById } from './getReservationById.ts'
import { reservationControllerUpdate } from './reservationControllerUpdate.ts'
import { searchReservations } from './searchReservations.ts'

export function reservationService() {
  return { createReservation, searchReservations, getReservationById, reservationControllerUpdate, deleteReservation }
}