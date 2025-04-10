import { Box, Typography } from '@mui/material'
import { useFormikContext } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import {
    ReservationFormData,
    useCompanyReservationOptions,
} from '../../utils/config'

type ReservationOptionsSelectorProps = {
    startDate: string
    endDate: string
    nights: number
    housingUnitTypeId?: string
}

type BillingType =
    | 'DAILY'
    | 'PER_GUEST_DAILY'
    | 'PER_GUEST'
    | 'PER_RESERVATION'
    | 'PER_HOUSING_UNIT'
    | string

const translateBillingType = (type: BillingType) => {
    switch (type) {
        case 'DAILY':
            return 'Por diária'
        case 'PER_GUEST_DAILY':
            return 'Por hóspede por diária'
        case 'PER_GUEST':
            return 'Por hóspede'
        case 'PER_RESERVATION':
            return 'Por reserva'
        case 'PER_HOUSING_UNIT':
            return 'Por unidade'
        default:
            return 'Outro tipo'
    }
}

export const ReservationOptionsSelector: React.FC<
    ReservationOptionsSelectorProps
> = ({ startDate, endDate, housingUnitTypeId }) => {
    const { values, setFieldValue } = useFormikContext<ReservationFormData>()
    const companyId = useCurrentCompanyId()

    const { data: reservationOptions } = useCompanyReservationOptions(
        companyId,
        startDate,
        endDate,
    )

    const handleOptionChange = (optionId: string) => {
        const isSelected = values.reservationOptions.includes(optionId)
        const updatedOptions = isSelected
            ? values.reservationOptions.filter((id) => id !== optionId)
            : [...values.reservationOptions, optionId]

        setFieldValue('reservationOptions', updatedOptions)
    }

    if (!reservationOptions?.items?.length) return null

    const availableOptions = reservationOptions.items.filter((option) => {
        if (!housingUnitTypeId) return true
        return option.availableHousingUnitTypes.some(
            (type) => type.housingUnitTypeId === housingUnitTypeId,
        )
    })

    if (!availableOptions.length) return null

    const groupedOptions = availableOptions.reduce<
        Record<string, typeof availableOptions>
    >((acc, option) => {
        const billingType = option.billingType || 'OUTRO'
        if (!acc[billingType]) acc[billingType] = []
        acc[billingType].push(option)
        return acc
    }, {})

    const getBillingTypeLabelWithPrice = (type: string, price: number) => {
        const formatted = formatCurrency(price)

        switch (type) {
            case 'DAILY':
                return `+${formatted} por diária`
            case 'PER_GUEST_DAILY':
                return `+${formatted} por hóspede por diária`
            case 'PER_GUEST':
                return `+${formatted} por hóspede`
            case 'PER_RESERVATION':
                return `+${formatted} por reserva`
            case 'PER_HOUSING_UNIT':
                return `+${formatted} por unidade`
            default:
                return `+${formatted}`
        }
    }

    return (
        <>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.0rem',
                    fontWeight: 500,
                    color: '#1F2937',
                    mb: 2,
                }}
            >
                Tipo de tarifa
            </Typography>

            {Object.entries(groupedOptions).map(([billingType, options]) => (
                <Box key={billingType}>
                    <Typography
                        variant="subtitle2"
                        sx={{ mt: 3, mb: 1, color: '#4B5563', fontWeight: 500 }}
                    >
                        {translateBillingType(billingType)}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {options.map((option) => {
                            const isSelected =
                                values.reservationOptions.includes(option.id)

                            return (
                                <Box
                                    key={option.id}
                                    onClick={() =>
                                        handleOptionChange(option.id)
                                    }
                                    sx={{
                                        border: '1px solid',
                                        borderColor: isSelected
                                            ? 'blue.900'
                                            : 'grey.300',
                                        borderRadius: 1,
                                        p: 2.5,
                                        cursor: 'pointer',
                                        bgcolor: isSelected
                                            ? 'primary.lighter'
                                            : 'transparent',
                                        '&:hover': {
                                            borderColor: 'blue.900',
                                            bgcolor: 'primary.lighter',
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {option.name}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 500,
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {getBillingTypeLabelWithPrice(
                                                    option.billingType,
                                                    option.additionalAdultPrice,
                                                )}
                                            </Typography>

                                            {isSelected && (
                                                <Box
                                                    sx={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: '50%',
                                                        bgcolor: 'blue.900',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: '50%',
                                                            bgcolor:
                                                                'background.paper',
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            ))}
        </>
    )
}
