export type ReservationOrderByDTOOrderBy = 'createdAt' | 'updatedAt' | 'status' | 'startDate' | 'endDate' | 'totalDays' | 'adults' | 'children'

export type ReservationOrderByDTODirection = 'asc' | 'desc'

export type ReservationOrderByInput = {
  /**
   * @type string
   */
  orderBy: ReservationOrderByDTOOrderBy
  /**
   * @type string
   */
  direction: ReservationOrderByDTODirection
}