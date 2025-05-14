import { ReservationCreateDTOStatus } from '@booksuite/sdk'
import { green, red, yellow } from '@mui/material/colors'

export const ROOMS_COLUMN_WIDTH = 250
export const CELL_HEIGHT = 46
export const CELL_WIDTH = 70
export const RESERVATION_ITEM_PADDING = 10
export const HEADER_CELL_HEIGHT = 65
export const VALID_OCCUPANCY_STATUS: ReservationCreateDTOStatus[] = [
    'CONFIRMED',
    'CHECKED_IN',
]

export const RESERVATION_STATUS_COLORS: Record<
    ReservationCreateDTOStatus,
    string
> = {
    WAITING_PAYMENT: yellow[800],
    CONFIRMED: green[500],
    CHECKED_IN: green[900],
    CHECKED_OUT: 'blueGrey.400',
    ABANDONED: red[800],
    CANCELLED: red[800],
    PAYMENT_FAILED: red[800],
    OVERBOOKED: yellow[800],
    WAITING_LIST: yellow[800],
}

export const RESERVATION_LABEL_MAP: Record<ReservationCreateDTOStatus, string> =
    {
        WAITING_PAYMENT: 'Aguardando pagamento',
        CONFIRMED: 'Confirmado',
        CHECKED_IN: 'Check-in',
        CHECKED_OUT: 'Check-out',
        ABANDONED: 'Abandonado',
        CANCELLED: 'Cancelado',
        PAYMENT_FAILED: 'Pagamento falhou',
        OVERBOOKED: 'Conflito de reservas',
        WAITING_LIST: 'Lista de espera',
    }
