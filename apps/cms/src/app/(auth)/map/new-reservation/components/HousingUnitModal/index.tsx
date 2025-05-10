import { useGetCalendar, useSearchHousingUnitTypes } from '@booksuite/sdk'
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
    TextField,
    Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'

interface HousingUnitModalProps {
    open: boolean
    onClose: () => void
    onSelect: (housingUnitId: string, finalPrice?: number) => void
    adults: number
    childrens: number
    selectedHousingUnitId?: string
    numberOfNights?: number
    startDate: string
    endDate: string
}

export const HousingUnitModal: React.FC<HousingUnitModalProps> = ({
    open,
    onClose,
    onSelect,
    adults,
    childrens,
    selectedHousingUnitId,
    startDate,
    endDate,
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const companyId = useCurrentCompanyId()

    const {
        data: availAndPricing,
        isLoading: isLoadingCalendar,
        error: calendarError,
    } = useGetCalendar(
        {
            companyId,
        },
        {
            currentDate: dayjs().startOf('day').toISOString(),
            viewWindow: {
                start: dayjs(startDate).format('YYYY-MM-DD'),
                end: dayjs(endDate).format('YYYY-MM-DD'),
            },
            search: {
                dateRange: {
                    start: dayjs(startDate).format('YYYY-MM-DD'),
                    end: dayjs(endDate).format('YYYY-MM-DD'),
                },
                adults,
            },
        },
        {
            query: {
                enabled: open,
            },
        },
    )

    const {
        data: allHousingUnitTypes,
        isLoading: isLoadingHousingUnitType,
        error,
    } = useSearchHousingUnitTypes(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: { published: true },
        },
        undefined,
        {
            query: {
                enabled: !!companyId && open,
            },
        },
    )

    const availableHousingUnitTypes =
        availAndPricing?.filter((avail) =>
            Object.entries(avail.calendar).some(
                (day) => day[1].availability.available,
            ),
        ) || []

    const hasAvailability = availableHousingUnitTypes?.length > 0

    useEffect(() => {
        if (
            !availAndPricing?.length ||
            hasAvailability ||
            isLoadingHousingUnitType
        )
            return

        enqueueSnackbar(
            'Disponibilidade de reserva não encontrada para a data especificada',
            {
                key: 'no-availability',
                variant: 'warning',
            },
        )
    }, [hasAvailability, isLoadingHousingUnitType, availAndPricing])

    const housingUnitTypesAvailAndPricing = availAndPricing?.map(
        (availAndPrice) => ({
            ...availAndPrice,
            housingUnitType: allHousingUnitTypes?.items.find(
                (type) => type.id === availAndPrice.id,
            ),
        }),
    )

    const calculateSubtotal = () => {
        if (!selectedHousingUnitId || !housingUnitTypesAvailAndPricing) return 0

        const selectedType = housingUnitTypesAvailAndPricing.find((type) =>
            type.housingUnits.find((unit) => unit.id === selectedHousingUnitId),
        )

        let price = Object.entries(selectedType?.calendar ?? {}).reduce(
            (sum, [, calendarDay]) => sum + calendarDay.basePrice,
            0,
        )

        if (
            selectedType?.housingUnitType?.chargeExtraAdultHigherThan &&
            adults > selectedType?.housingUnitType?.chargeExtraAdultHigherThan
        )
            price += selectedType?.housingUnitType?.extraAdultPrice || 0

        return price
    }

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
                    InputProps={{
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
                    }}
                    sx={{ mb: 3 }}
                />
            </DialogTitle>
            <DialogContent>
                {isLoadingHousingUnitType && isLoadingCalendar ? (
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
                ) : error || calendarError ? (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography color="error">
                            Erro ao carregar acomodações. Por favor, tente
                            novamente.
                        </Typography>
                    </Box>
                ) : !housingUnitTypesAvailAndPricing?.length ? (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography color="text.secondary">
                            Nenhuma acomodação disponível.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Box>
                            {housingUnitTypesAvailAndPricing.map((type) => {
                                const isDisabled =
                                    childrens >
                                        (type.housingUnitType?.maxChildren ??
                                            0) ||
                                    adults + childrens >
                                        (type.housingUnitType?.maxGuests ?? 0)

                                return type.housingUnits.map((unit) => (
                                    <Box
                                        key={unit.id}
                                        onClick={() => onSelect(unit.id)}
                                        sx={() => {
                                            return {
                                                border: '1px solid',
                                                borderColor:
                                                    selectedHousingUnitId ===
                                                    unit.id
                                                        ? 'blue.900'
                                                        : isDisabled
                                                          ? '#D1D5DB'
                                                          : '#E5E7EB',
                                                borderRadius: 1,
                                                p: 3,
                                                mb: 2,
                                                cursor: isDisabled
                                                    ? 'not-allowed'
                                                    : 'pointer',
                                                bgcolor: isDisabled
                                                    ? '#F3F4F6'
                                                    : selectedHousingUnitId ===
                                                        unit.id
                                                      ? '#F3F6FF'
                                                      : '#FFFFFF',
                                                color: isDisabled
                                                    ? '#6B7280'
                                                    : 'inherit',
                                                opacity: isDisabled ? 0.9 : 1,
                                                '&:hover': {
                                                    borderColor: isDisabled
                                                        ? '#D1D5DB'
                                                        : 'blue.900',
                                                    bgcolor: isDisabled
                                                        ? '#F3F4F6'
                                                        : '#F3F6FF',
                                                },
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                transition:
                                                    'all 0.2s ease-in-out',
                                                pointerEvents: isDisabled
                                                    ? 'none'
                                                    : 'auto',
                                            }
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 400,
                                                    color: isDisabled
                                                        ? '#6B7280'
                                                        : '#1F2937',
                                                }}
                                            >
                                                {type.name} {unit.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    color: isDisabled
                                                        ? '#FCA5A5'
                                                        : '#6B7280',
                                                }}
                                            >
                                                {`${
                                                    isDisabled
                                                        ? 'Adultos ' +
                                                          type.housingUnitType
                                                              ?.maxAdults +
                                                          ' Crianças ' +
                                                          type.housingUnitType
                                                              ?.maxChildren
                                                        : 'Máx. Hóspedes ' +
                                                          type.housingUnitType
                                                              ?.maxGuests
                                                }`}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    color: isDisabled
                                                        ? '#6B7280'
                                                        : '#1F2937',
                                                    mb: 0.5,
                                                }}
                                            >
                                                {formatCurrency(
                                                    type.housingUnitType
                                                        ?.weekdaysPrice || 0,
                                                )}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: isDisabled
                                                        ? '#6B7280'
                                                        : '#1F2937',
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                por diária
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))
                            })}
                        </Box>
                        {selectedHousingUnitId && (
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
                                    Sub total das diárias:
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        color: '#1F2937',
                                    }}
                                >
                                    {formatCurrency(calculateSubtotal())}
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    size="large"
                    sx={{
                        minWidth: 120,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderColor: '#E5E7EB',
                        color: '#374151',
                        '&:hover': {
                            borderColor: '#D1D5DB',
                            bgcolor: '#F9FAFB',
                        },
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={() => {
                        onSelect(
                            selectedHousingUnitId || '',
                            calculateSubtotal(),
                        )
                        onClose()
                    }}
                    variant="contained"
                    size="large"
                    disabled={!selectedHousingUnitId}
                    sx={{
                        minWidth: 120,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    }}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
