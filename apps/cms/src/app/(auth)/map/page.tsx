'use client'

import { ReservationStatus } from '@booksuite/sdk'
import { useGetCalendar } from '@booksuite/sdk/src/gen/hooks/Availability and PricingHooks/useGetCalendar'
import { useSearchReservations } from '@booksuite/sdk/src/gen/hooks/ReservationHooks/useSearchReservations'
import { RefreshRounded } from '@mui/icons-material'
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import {
    DatePickerRange,
    DateRangePicker,
} from '@/components/molecules/DateRangePicker'
import { Calendar } from '@/components/organisms/Calendar'
import {
    RESERVATION_LABEL_MAP,
    RESERVATION_STATUS_COLORS,
} from '@/components/organisms/Calendar/constants'
import { PageHeader } from '@/components/organisms/PageHeader'
import { useDashboardLayoutStore } from '@/components/templates/DashboardLayout/stores'
import Link from 'next/link'

const MapPage: React.FC = () => {
    const companyId = useCurrentCompanyId()
    const menuAnchorElem = useRef<HTMLButtonElement>(null)
    const [menuOpen, setMenuOpen] = useState(false)

    const { setFullWidth, setBgcolor } = useDashboardLayoutStore()
    const [range, setRange] = useState<DatePickerRange>({
        start: dayjs(),
        end: dayjs().add(1, 'month'),
    })

    useEffect(() => {
        setFullWidth(true)
        setBgcolor('blueGrey.50')
        return () => {
            setFullWidth(false)
            setBgcolor('background.default')
        }
    }, [setFullWidth, setBgcolor])

    const formattedStartDate = range.start?.format('YYYY-MM-DD') ?? ''
    const formattedEndDate = range.end?.format('YYYY-MM-DD') ?? ''

    const {
        data: availabilityAndPricing,
        isLoading: isLoadingAvailabilityAndPricing,
        refetch: refetchAvailabilityAndPricing,
    } = useGetCalendar(
        { companyId },
        {
            currentDate: dayjs.utc().format('YYYY-MM-DD'),
            viewWindow: {
                start: formattedStartDate,
                end: formattedEndDate,
            },
        },
        { query: { refetchOnMount: true, refetchInterval: 10000 } },
    )

    const {
        data: reservations,
        isLoading: isLoadingReservations,
        refetch: refetchReservations,
    } = useSearchReservations(
        { companyId },
        {
            filter: {
                dateRange: {
                    start: formattedStartDate,
                    end: formattedEndDate,
                },
                status: ['CHECKED_IN', 'CHECKED_OUT', 'CONFIRMED'],
            },
            pagination: { page: 1, itemsPerPage: 1000 },
        },
        undefined,
        {
            query: {
                refetchOnMount: true,
                refetchInterval: 10000,
                select: (data) => data.items,
            },
        },
    )

    const handleRefresh = () => {
        refetchAvailabilityAndPricing()
        refetchReservations()
    }

    const weekendDays = Object.values(
        availabilityAndPricing?.at(0)?.calendar ?? {},
    )?.[0]?.hostingRules.availableWeekend ?? [0, 6]

    return (
        <Box>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <PageHeader.Title>Mapa de reservas</PageHeader.Title>
                    <IconButton color="primary" onClick={handleRefresh}>
                        <RefreshRounded />
                    </IconButton>
                </Stack>
                <Stack
                    flex={1}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <DateRangePicker range={range} onChange={setRange} />
                </Stack>
                <Button
                    onClick={() => setMenuOpen(true)}
                    ref={menuAnchorElem}
                    endIcon={<ChevronDown />}
                >
                    Opções
                </Button>
                <Menu
                    open={menuOpen}
                    anchorEl={menuAnchorElem.current}
                    onClose={() => setMenuOpen(false)}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    transformOrigin={{
                        vertical: -5,
                        horizontal: 'right',
                    }}
                    sx={{
                        '& .MuiPaper-root': {
                            minWidth: 200,
                        },
                    }}
                >
                    <MenuItem dense component={Link} href="/reservation">
                        <Typography fontSize={13}>Adicionar reserva</Typography>
                    </MenuItem>
                </Menu>
            </Stack>

            <Box>
                <Calendar
                    isLoading={
                        isLoadingAvailabilityAndPricing || isLoadingReservations
                    }
                    startDate={formattedStartDate}
                    endDate={formattedEndDate}
                    availabilityAndPricing={availabilityAndPricing}
                    reservations={reservations}
                    weekendDays={weekendDays}
                />
            </Box>

            <Stack direction="row" spacing={1.5} mt={2}>
                {Object.entries(RESERVATION_STATUS_COLORS).map(
                    ([key, color]) => (
                        <Tooltip
                            key={key}
                            title={
                                RESERVATION_LABEL_MAP[key as ReservationStatus]
                            }
                        >
                            <Box
                                key={key}
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    bgcolor: color,
                                }}
                            />
                        </Tooltip>
                    ),
                )}
            </Stack>
        </Box>
    )
}

export default MapPage
