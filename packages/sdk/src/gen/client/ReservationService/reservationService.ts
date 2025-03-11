/* eslint-disable no-alert, no-console */
import { createReservation } from './createReservation.ts'
import { deleteReservation } from './deleteReservation.ts'
import { getReservationById } from './getReservationById.ts'
import { searchReservations } from './searchReservations.ts'
import { updateReservation } from './updateReservation.ts'

export function reservationService() {
  return { createReservation, searchReservations, getReservationById, updateReservation, deleteReservation }
}