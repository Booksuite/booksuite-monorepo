import { Box, styled } from '@mui/material'

import { CELL_WIDTH, HEADER_CELL_HEIGHT } from '../constants'

export const Cell = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    color: theme.palette.blueGrey[700],
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRight: `1px solid`,
    borderBottom: `1px solid`,
    borderColor: theme.palette.blueGrey[100],
    height: '46px',
}))

export const RoomCell = styled(Cell)(({ theme }) => ({
    padding: theme.spacing(3),
    alignItems: 'flex-start',
    // minWidth: '200px',
}))

export const HeaderCell = styled(Cell)(({ theme }) => ({
    backgroundColor: theme.palette.blueGrey[700],
    color: theme.palette.primary.contrastText,
    minWidth: CELL_WIDTH,
    maxWidth: CELL_WIDTH,
    height: HEADER_CELL_HEIGHT,
    fontWeight: 'bold',
}))

export const CalendarCell = styled(Cell)(() => ({
    overflow: 'hidden',
    minWidth: CELL_WIDTH,
    maxWidth: CELL_WIDTH,
    '&:last-child': {
        borderRight: 'none',
    },
}))
