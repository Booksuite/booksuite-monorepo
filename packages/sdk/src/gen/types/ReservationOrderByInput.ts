export const ReservationOrderByDTOOrderBy = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  totalDays: 'totalDays',
  adults: 'adults',
  children: 'children',
} as const

type ReservationOrderByDTOOrderBy = (typeof ReservationOrderByDTOOrderBy)[keyof typeof ReservationOrderByDTOOrderBy]

export const ReservationOrderByDTODirection = {
  asc: 'asc',
  desc: 'desc',
} as const

type ReservationOrderByDTODirection = (typeof ReservationOrderByDTODirection)[keyof typeof ReservationOrderByDTODirection]

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