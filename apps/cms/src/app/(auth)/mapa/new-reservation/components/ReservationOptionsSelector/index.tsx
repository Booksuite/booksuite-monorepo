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
        const newOptions = values.reservationOptions.includes(optionId)
            ? values.reservationOptions.filter((id) => id !== optionId)
            : [...values.reservationOptions, optionId]
        setFieldValue('reservationOptions', newOptions)
    }

    if (!reservationOptions?.items?.length) {
        return null
    }

    const availableOptions = reservationOptions.items.filter((option) => {
        if (!housingUnitTypeId) return true
        return option.availableHousingUnitTypes.some(
            (type) => type.housingUnitTypeId === housingUnitTypeId,
        )
    })

    if (!availableOptions.length) {
        return null
    }

    return (
        <>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#1F2937',
                    mb: 2,
                }}
            >
                Tipo de tarifa
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {availableOptions.map((option) => (
                    <Box
                        key={option.id}
                        onClick={() => handleOptionChange(option.id)}
                        sx={{
                            border: '1px solid',
                            borderColor: values.reservationOptions.includes(
                                option.id,
                            )
                                ? 'blue.900'
                                : 'blueGrey.100',
                            borderRadius: 1,
                            p: 3,
                            cursor: 'pointer',
                            bgcolor: values.reservationOptions.includes(
                                option.id,
                            )
                                ? 'blueGrey.50'
                                : 'transparent',
                            '&:hover': {
                                borderColor: 'blue.900',
                                bgcolor: 'blueGrey.50',
                            },
                            position: 'relative',
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
                                    fontWeight: 400,
                                    color: '#1F2937',
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
                                    variant="subtitle1"
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: '#6B7280',
                                    }}
                                >
                                    +
                                    {formatCurrency(
                                        option.additionalAdultPrice,
                                    )}{' '}
                                    por diária
                                </Typography>
                                {values.reservationOptions.includes(
                                    option.id,
                                ) && (
                                    <Box
                                        sx={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: '50%',
                                            bgcolor: 'blue.900',
                                            alignContent: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                margin: 'auto',
                                                width: 10,
                                                height: 10,
                                                borderRadius: '50%',
                                                bgcolor: 'blueGrey.50',
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}
