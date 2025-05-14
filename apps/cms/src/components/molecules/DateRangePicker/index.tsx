import {
    Box,
    IconButton,
    Popover,
    Stack,
    TextField,
    useTheme,
} from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Dayjs } from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export interface DatePickerRange {
    start: Dayjs | null
    end: Dayjs | null
}

interface DateRangePickerProps {
    range: DatePickerRange
    onChange: (newRange: Required<DatePickerRange>) => void
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
    range,
    onChange,
}) => {
    const theme = useTheme()
    const anchorRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)

    const [activeDate, setActiveDate] = useState<'start' | 'end'>('start')
    const [currentRange, setCurrentRange] = useState<DatePickerRange>(
        () => range,
    )
    useEffect(() => {
        if (!open) return

        setActiveDate('start')
        setCurrentRange(range)
    }, [range, open])

    const handleChange = (date: Dayjs | null) => {
        const newRange =
            activeDate === 'start'
                ? {
                      start: date,
                      end: null,
                  }
                : {
                      start: currentRange.start,
                      end: date,
                  }
        setCurrentRange(newRange)
        if (activeDate === 'end') onChange(newRange)

        setActiveDate((curr) => (curr === 'start' ? 'end' : 'start'))
    }

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        if (!currentRange.start || !currentRange.end) setCurrentRange(range)

        setOpen(false)
    }

    const displayValue =
        currentRange.start && currentRange.end
            ? `${currentRange.start.format('DD/MM/YYYY')} até ${currentRange.end.format('DD/MM/YYYY')}`
            : ''

    const isInRange = (date: Dayjs) => {
        if (!currentRange.start || !currentRange.end) return false
        return (
            date.isAfter(currentRange.start, 'day') &&
            date.isBefore(currentRange.end, 'day')
        )
    }

    const isStart = (date: Dayjs) => {
        if (!currentRange.start || !currentRange.end) return false
        return date.isSame(currentRange.start, 'day')
    }
    const isEnd = (date: Dayjs) => {
        if (!currentRange.start || !currentRange.end) return false
        return date.isSame(currentRange.end, 'day')
    }
    const isStartOrEnd = (date: Dayjs) => {
        if (!currentRange.start || !currentRange.end) return false
        return isStart(date) || isEnd(date)
    }

    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <TextField
                    ref={anchorRef}
                    variant="outlined"
                    size="small"
                    value={displayValue}
                    onClick={handleClick}
                    placeholder="Selecione um período"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            width: 250,
                            color: theme.palette.blueGrey[900],
                            fontSize: 14,
                            fontWeight: 500,
                            bgcolor: 'background.paper',
                            cursor: 'pointer',
                        },
                    }}
                    slotProps={{
                        input: {
                            readOnly: true,
                            endAdornment: (
                                <IconButton size="small">
                                    <CalendarIcon size={16} />
                                </IconButton>
                            ),
                        },
                    }}
                />
            </Stack>

            <Popover
                open={open}
                anchorEl={anchorRef.current}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                    <Box>
                        <DateCalendar
                            referenceDate={
                                currentRange.start
                                    ? currentRange.start
                                    : undefined
                            }
                            onChange={handleChange}
                            minDate={
                                currentRange.start && !currentRange.end
                                    ? currentRange.start
                                    : undefined
                            }
                            sx={{
                                '& .MuiPickersDay-dayWithMargin, & .MuiDayCalendar-weekDayLabel':
                                    {
                                        margin: 0,
                                    },
                            }}
                            slots={{
                                day: (props) => (
                                    <PickersDay
                                        {...props}
                                        selected={isStartOrEnd(props.day)}
                                        today={false}
                                        sx={{
                                            '&.Mui-selected': {
                                                bgcolor:
                                                    theme.palette.blueGrey[100],
                                                color: theme.palette
                                                    .blueGrey[900],
                                                '&:hover': {
                                                    bgcolor:
                                                        theme.palette
                                                            .blueGrey[200],
                                                },
                                            },

                                            '&:focus': {
                                                bgcolor:
                                                    theme.palette
                                                        .blueGrey[100] +
                                                    ' !important',
                                                color:
                                                    theme.palette
                                                        .blueGrey[900] +
                                                    ' !important',
                                            },

                                            ...(isStart(props.day) && {
                                                borderBottomRightRadius: 0,
                                                borderTopRightRadius: 0,
                                            }),
                                            ...(isEnd(props.day) && {
                                                borderBottomLeftRadius: 0,
                                                borderTopLeftRadius: 0,
                                            }),
                                            ...(isInRange(props.day) && {
                                                bgcolor:
                                                    theme.palette.blueGrey[100],
                                                borderRadius: 0,

                                                color: theme.palette
                                                    .blueGrey[900],
                                            }),
                                        }}
                                    />
                                ),
                            }}
                        />
                    </Box>
                </Stack>
            </Popover>
        </Box>
    )
}
