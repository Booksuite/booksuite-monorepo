import {
    AvailabilityAndPricing,
    HousingUnitType,
    useGetCalendar,
    useGetCalendarFromHousingUnitTypeId,
} from '@booksuite/sdk'
import { useSearchServices } from '@booksuite/sdk/src/gen/hooks/ServiceHooks/useSearchServices'
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
import { useFormikContext } from 'formik'
import moment from 'moment'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { ReservationFormData, useCompanyHousingUnitTypes } from '../../utils/config'

interface HousingUnitModalProps {
    open: boolean
    onClose: () => void
    onSelect: (housingUnitId: string) => void
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
    adults = 0,
    childrens = 0,
    selectedHousingUnitId,
    numberOfNights = 1,
    startDate,
    endDate,
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const companyId = useCurrentCompanyId()

    const { setFieldValue, values } = useFormikContext<ReservationFormData>()

    function transformAvailAndPricing(
        availAndPricing: AvailabilityAndPricing,
        housingUnitType: HousingUnitType,
    ) {
        return {
            ...availAndPricing,
            housingUnitType: housingUnitType,
        }
    }

    const { data: availAndPricing, isLoadingCalendar } = useGetCalendar(
        {
            companyId,
        },
        {
            currentDate: moment().startOf('day').toISOString(),
            dateRange: {
                start: moment(startDate).toISOString(),
                end: moment(endDate).toISOString(),
            },
        },
    )

    const {
        data: allhousingUnitTypes,
        isLoading: isLoadingHousingUnitType,
        error,
    } = useCompanyHousingUnitTypes(companyId, open)

    const pricing = availAndPricing?.filter((avail) =>
        Object.entries(avail.calendar).every(
            (day) => day[1].availability.available === true,
        ),
    )
    const housingUnitTypesAvailAndPricing = pricing?.map((availAndPrice) => ({
        ...availAndPrice,
        housingUnitType: allhousingUnitTypes?.items.find(
            (type) => type.id === availAndPrice.id,
        ),
    }))

    const handleSelect = (unitId: string) => {
        onSelect(unitId)
        onClose()
    }

    const calculateSubtotal = () => {
        if (!selectedHousingUnitId || !housingUnitTypesAvailAndPricing) return 0

        const selectedType = housingUnitTypesAvailAndPricing.find((type) =>
            type.housingUnits.find((unit) => unit.id === selectedHousingUnitId),
        )

        const price = Object.entries(selectedType?.calendar ?? {}).reduce(
            (sum, [, calendarDay]) => sum + calendarDay.finalPrice,
            0,
        )
        setFieldValue('finalReservationPrice', price)
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
                {isLoadingHousingUnitType ? (
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
                ) : error ? (
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
                                    adults > type.housingUnitType?.maxAdults ||
                                    childrens >
                                        type.housingUnitType?.maxChildren ||
                                    adults + childrens >
                                        type.housingUnitType?.maxChildren

                                return type.housingUnits.map((unit) => (
                                    <Box
                                        key={unit.id}
                                        onClick={() => handleSelect(unit.id)}
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
                    onClick={() =>
                        selectedHousingUnitId &&
                        handleSelect(selectedHousingUnitId)
                    }
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
