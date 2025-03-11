export type DeleteReservationPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type DeleteReservation200 = any

export type DeleteReservationMutationResponse = DeleteReservation200

export type DeleteReservationMutation = {
  Response: DeleteReservation200
  PathParams: DeleteReservationPathParams
  Errors: any
}