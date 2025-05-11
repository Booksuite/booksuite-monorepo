import { ServiceFull, useSearchServices } from '@booksuite/sdk'
import { Box, Button, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { FormSection } from '@/components/atoms/FormSection'
import { ReservationFormData } from '../../utils/config'
import {
    calculateTotalStay,
    getNewReservationServicesArray,
} from '../../utils/helpers'

import { ServiceItem } from './ServiceItem'
import { ServicesModal } from './ServiceModal'

export const ServicesSection: React.FC = () => {
    const [isServicesModalOpen, setIsServicesModalOpen] = useState(false)

    const { values, setFieldValue } = useFormikContext<ReservationFormData>()

    const companyId = useCurrentCompanyId()

    const { data: services } = useSearchServices(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: {
                published: true,
                housingUnitTypeIds: [values.housingUnitType?.id || ''],
            },
        },
        undefined,
        {
            query: {
                enabled:
                    !!companyId &&
                    isServicesModalOpen &&
                    !!values.housingUnitType?.id,
            },
        },
    )

    const handleUpdateServices = (
        service: ServiceFull,
        newQuantity: number,
    ) => {
        const updatedServices = getNewReservationServicesArray(
            values.services || [],
            service,
            newQuantity,
            values.adults,
            calculateTotalStay(values.startDate, values.endDate),
        )

        setFieldValue('services', updatedServices)
    }

    const totalServicesPrice = values.services?.reduce(
        (acc, service) => acc + service.totalPrice,
        0,
    )

    return (
        <>
            <FormSection
                title="Itens Adicionais"
                rightAction={
                    <Button
                        onClick={() => setIsServicesModalOpen(true)}
                        variant="contained"
                        color="primary"
                        disabled={
                            values.startDate && values.endDate ? false : true
                        }
                    >
                        Adicionar
                    </Button>
                }
                variant="outlined"
            >
                <Box>
                    {values.services?.length === 0 && (
                        <Box
                            sx={{
                                borderRadius: 1,
                                p: 3,
                                bgcolor: '#F9FAFB',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 70,
                            }}
                        >
                            <Typography color="text.disabled">
                                Nenhum item adicionado
                            </Typography>
                        </Box>
                    )}

                    {values.services?.map((service) => {
                        const serviceFull = services?.items.find(
                            (s) => s.id === service.id,
                        )

                        if (!serviceFull) return null

                        return (
                            <ServiceItem
                                key={service.id}
                                service={serviceFull}
                                totalAdults={values.adults}
                                totalStay={calculateTotalStay(
                                    values.startDate,
                                    values.endDate,
                                )}
                                quantity={service.quantity}
                                handleUpdateServices={handleUpdateServices}
                            />
                        )
                    })}

                    <Box
                        sx={{
                            borderTop: '1px solid',
                            borderColor: '#E5E7EB',
                            mt: 3,
                            pt: 3,
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
                            }}
                        >
                            Sub total:
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1.25rem',
                                fontWeight: 500,
                            }}
                        >
                            {formatCurrency(totalServicesPrice)}
                        </Typography>
                    </Box>
                </Box>
            </FormSection>

            <ServicesModal
                open={isServicesModalOpen}
                services={services?.items || []}
                onClose={() => setIsServicesModalOpen(false)}
                initialServices={values.services || []}
                onUpdateServices={(newReservationServices) =>
                    setFieldValue('services', newReservationServices)
                }
            />
        </>
    )
}
