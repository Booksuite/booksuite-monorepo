import {
    HousingUnit,
    HousingUnitTypeAvailAndPriceInput,
    useCalculatePrice,
} from '@booksuite/sdk'
import SearchIcon from '@mui/icons-material/Search'
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { transformAgeGroupObjToArray } from '../../utils/config'

import { HousingUnitItem } from './HousintUnitItem'

interface HousingUnitModalProps {
    open: boolean
    onClose: () => void
    onSelect: (
        housingUnitType: HousingUnitTypeAvailAndPriceInput,
        HousingUnit: HousingUnit,
    ) => void
    adults: number
    ageGroups: Record<string, number>
    initialSelectedHousingUnitId?: string
    numberOfNights?: number
    startDate: string
    endDate: string
}

export const HousingUnitTypeModal: React.FC<HousingUnitModalProps> = ({
    open,
    onClose,
    onSelect,
    adults,
    ageGroups,
    initialSelectedHousingUnitId,
    startDate,
    endDate,
}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const childrens = Object.values(ageGroups).reduce(
        (sum, c) => sum + Number(c),
        0,
    )

    const companyId = useCurrentCompanyId()
    const [selectedHousingUnitId, setSelectedHousingUnitId] = useState<
        string | null
    >(() => initialSelectedHousingUnitId || null)

    useEffect(() => {
        setSelectedHousingUnitId(initialSelectedHousingUnitId || null)
    }, [initialSelectedHousingUnitId, open])

    const {
        data: availAndPricing,
        isLoading: isLoadingCalendar,
        error: calendarError,
    } = useCalculatePrice(
        {
            companyId,
        },
        {
            currentDate: dayjs().startOf('day').toISOString(),

            search: {
                dateRange: {
                    start: dayjs(startDate).format('YYYY-MM-DD'),
                    end: dayjs(endDate).format('YYYY-MM-DD'),
                },
                adults,
                ageGroups: transformAgeGroupObjToArray(ageGroups),
            },
        },
        {
            query: {
                enabled: open,
            },
        },
    )

    const availableHousingUnitTypes = useMemo(() => {
        return (
            availAndPricing?.filter(
                (avail) =>
                    !avail.summary.availability.length &&
                    avail.summary.availableHousingUnits.length > 0,
            ) || []
        )
    }, [availAndPricing])

    const hasAvailability = availableHousingUnitTypes?.length > 0

    useEffect(() => {
        if (!availAndPricing?.length || hasAvailability || isLoadingCalendar)
            return

        enqueueSnackbar(
            'Disponibilidade de reserva não encontrada para a data especificada',
            {
                key: 'no-availability',
                variant: 'warning',
            },
        )
    }, [hasAvailability, isLoadingCalendar, availAndPricing])

    const selectedHousingUnitTypePrice = useMemo(
        () =>
            availAndPricing?.find((avail) =>
                avail.housingUnits.find(
                    (unit) => unit.id === selectedHousingUnitId,
                ),
            ),
        [availAndPricing, selectedHousingUnitId],
    )
    const handleSelect = () => {
        const housingUnit = selectedHousingUnitTypePrice?.housingUnits.find(
            (unit) => unit.id === selectedHousingUnitId,
        )

        if (!selectedHousingUnitTypePrice || !housingUnit) return

        onSelect(selectedHousingUnitTypePrice, housingUnit)

        onClose()
    }

    const subTotalPrice = selectedHousingUnitTypePrice?.summary.finalPrice ?? 0

    const filteredHousingUnitsTypes = useMemo(() => {
        return availableHousingUnitTypes.filter(
            (type) =>
                type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                type.housingUnits.some((unit) =>
                    unit.name.toLowerCase().includes(searchQuery.toLowerCase()),
                ),
        )
    }, [availableHousingUnitTypes, searchQuery])

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ pb: 0 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: '#1F2937',
                            mb: 1,
                        }}
                    >
                        Acomodação
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: '#6B7280',
                        }}
                    >
                        Selecione uma acomodação
                    </Typography>
                </Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Pesquisar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#9CA3AF' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                bgcolor: '#F9FAFB',
                                '& fieldset': {
                                    borderColor: '#E5E7EB',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#D1D5DB',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue.900',
                                },
                            },
                        },
                    }}
                    sx={{ mb: 3 }}
                />
            </DialogTitle>
            <DialogContent>
                {isLoadingCalendar ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 4,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : calendarError ? (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography color="error">
                            Erro ao carregar acomodações. Por favor, tente
                            novamente.
                        </Typography>
                    </Box>
                ) : !availableHousingUnitTypes?.length ? (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography color="text.secondary">
                            Nenhuma acomodação disponível.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Stack gap={2}>
                            {filteredHousingUnitsTypes.map((type) => {
                                const isDisabled =
                                    childrens > (type?.maxChildren ?? 0) ||
                                    adults + childrens > (type?.maxGuests ?? 0)

                                return type.housingUnits.map((unit) => {
                                    const isUnitSelected =
                                        selectedHousingUnitId === unit.id

                                    return (
                                        <HousingUnitItem
                                            key={unit.id}
                                            housingUnitType={type}
                                            housingUnit={unit}
                                            selected={isUnitSelected}
                                            disabled={isDisabled}
                                            onClick={setSelectedHousingUnitId}
                                        />
                                    )
                                })
                            })}
                        </Stack>

                        <Box
                            sx={{
                                borderTop: 1,
                                borderColor: '#E5E7EB',
                                pt: 3,
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: '1.125rem',
                                    fontWeight: 500,
                                    color: '#1F2937',
                                }}
                            >
                                Subtotal das diárias:
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    color: '#1F2937',
                                }}
                            >
                                {formatCurrency(subTotalPrice)}
                            </Typography>
                        </Box>
                    </>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    Cancelar
                </Button>
                <Button
                    onClick={handleSelect}
                    disabled={!selectedHousingUnitId}
                >
                    Selecionar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
