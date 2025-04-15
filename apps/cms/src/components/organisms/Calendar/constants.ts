import { ReservationCreateDTOStatus } from '@booksuite/sdk'

export const CELL_HEIGHT = 46
export const CELL_WIDTH = 70
export const RESERVATION_ITEM_PADDING = 10
export const HEADER_CELL_HEIGHT = 65
export const VALID_OCCUPANCY_STATUS: ReservationCreateDTOStatus[] = [
    'CONFIRMED',
    'CHECKED_IN',
]
