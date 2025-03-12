export enum ReservationOrderByDTOOrderBy {
  'createdAt' = 'createdAt',
  'updatedAt' = 'updatedAt',
  'status' = 'status',
  'startDate' = 'startDate',
  'endDate' = 'endDate',
  'totalDays' = 'totalDays',
  'adults' = 'adults',
  'children' = 'children',
}

export enum ReservationOrderByDTODirection {
  'asc' = 'asc',
  'desc' = 'desc',
}

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