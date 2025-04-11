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
        setFieldValue('reservationOptions', [optionId])
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

    const getBillingTypeLabel = (type: string) => {
        switch (type) {
            case 'DAILY':
                return `por diária`
            case 'PER_GUEST_DAILY':
                return `por hóspede por diária`
            case 'PER_GUEST':
                return `por hóspede`
            case 'PER_RESERVATION':
                return `por reserva`
            case 'PER_HOUSING_UNIT':
                return `+$por unidade`
            default:
                return ``
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
                    ></Typography>

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
                                        borderRadius: 2,
                                        p: 2,
                                        cursor: 'pointer',
                                        bgcolor: isSelected
                                            ? 'primary.lighter'
                                            : 'transparent',
                                        '&:hover': {
                                            borderColor: 'blue.900',
                                            bgcolor: 'primary.lighter',
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: isSelected
                                                ? 'blue.900'
                                                : 'text.primary',
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
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                textAlign: 'right',
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: 14,
                                                    color: isSelected
                                                        ? 'blue.900'
                                                        : 'text.primary',
                                                }}
                                            >
                                                {`+${formatCurrency(
                                                    option.additionalAdultPrice,
                                                )}`}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'text.secondary' }}
                                                fontWeight={400}
                                                fontSize={13}
                                            >
                                                {getBillingTypeLabel(
                                                    option.billingType,
                                                )}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: '50%',
                                                border: '2px solid',
                                                borderColor: isSelected
                                                    ? 'blue.900'
                                                    : 'grey.400',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {isSelected && (
                                                <Box
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: '50%',
                                                        bgcolor: 'blue.900',
                                                    }}
                                                />
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
