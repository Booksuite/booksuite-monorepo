import { useGetHousingUnitTypeById } from '@booksuite/sdk'
import { Box, Button, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import moment from 'moment'
import { omit, pick } from 'radash'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { FormSection } from '@/components/atoms/FormSection'
import { ReservationFormData } from '../../utils/config'
import { RateOptionsSelector } from '../RateOptionsSelector'

import { HousingUnitTypeModal } from './HousingUnitModal'

export const HousingUnitTypeSection: React.FC = () => {
    const [isHousingUnitModalOpen, setIsHousingUnitModalOpen] = useState(false)
    const companyId = useCurrentCompanyId()

    const { values, setValues } = useFormikContext<ReservationFormData>()

    const handleOpenHousingUnitModal = () => {
        setIsHousingUnitModalOpen(true)
    }

    const { data: housingUnitType, isLoading: isLoadingHousingUnitType } =
        useGetHousingUnitTypeById(
            {
                companyId,
                id: values.housingUnitTypeId,
            },
            {
                query: {
                    enabled:
                        !!values.housingUnitTypeId && !!values.housingUnitId,
                },
            },
        )

    return (
        <>
            <FormSection
                title="Acomodação"
                isLoading={isLoadingHousingUnitType}
                rightAction={
                    <Button
                        onClick={handleOpenHousingUnitModal}
                        disabled={!values.startDate || !values.endDate}
                    >
                        {values.housingUnitId
                            ? 'Alterar Acomodação'
                            : 'Adicionar'}
                    </Button>
                }
                variant="outlined"
            >
                {housingUnitType && (
                    <Box>
                        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                            {housingUnitType.medias?.[0]?.media?.url && (
                                <Box
                                    component="img"
                                    src={housingUnitType.medias[0].media.url}
                                    alt={housingUnitType?.name}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 1,
                                        objectFit: 'cover',
                                    }}
                                />
                            )}
                            <Box sx={{ flex: 1 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 2,
                                    }}
                                >
                                    <Box>
                                        <Box display={'flex'} gap={1}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 600,
                                                    mb: 1,
                                                }}
                                            >
                                                {housingUnitType.name}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 600,
                                                    mb: 1,
                                                }}
                                            >
                                                {housingUnitType.name}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#6B7280',
                                            }}
                                        >
                                            {`${moment(values.endDate).diff(
                                                moment(values.startDate),
                                                'days',
                                            )} Noites`}
                                        </Typography>
                                    </Box>
                                </Box>
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
                                            color: '#6B7280',
                                        }}
                                    >
                                        Total das diárias
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '1.2rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {formatCurrency(values.finalPrice)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <RateOptionsSelector />
                    </Box>
                )}
            </FormSection>

            <HousingUnitTypeModal
                open={isHousingUnitModalOpen}
                onClose={() => setIsHousingUnitModalOpen(false)}
                onSelect={(housingUnitType, housingUnit) => {
                    setValues((curr) => ({
                        ...curr,
                        housingUnitTypeId: housingUnitType.id,
                        housingUnitType: omit(housingUnitType, ['summary']),
                        housingUnit: housingUnit,
                        housingUnitId: housingUnit.id,

                        ...pick(housingUnitType.summary, [
                            'basePrice',
                            'childrenPrice',
                            'rateOptionPrice',
                            'servicesPrice',
                            'finalPrice',
                        ]),
                    }))
                }}
                initialSelectedHousingUnitId={values.housingUnit?.id}
                adults={values.adults ? values.adults : 0}
                ageGroups={values.ageGroups}
                startDate={values.startDate}
                endDate={values.endDate}
            />
        </>
    )
}
