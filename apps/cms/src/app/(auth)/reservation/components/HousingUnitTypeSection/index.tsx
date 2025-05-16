import {
    ReservationSummaryInput,
    useGetHousingUnitTypeById,
} from '@booksuite/sdk'
import { Box, Button, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { FormSection } from '@/components/atoms/FormSection'
import { RateOptionsSection } from '../RateOptionsSection'

import { HousingUnitTypeModal } from './HousingUnitModal'

interface HousingUnitTypeSectionProps {
    onChange: (reservationSummary: ReservationSummaryInput) => void
    reservationSummary: ReservationSummaryInput | null
    adults: number
    ageGroups: Record<string, number>
    startDate: string
    endDate: string
}

export const HousingUnitTypeSection: React.FC<HousingUnitTypeSectionProps> = ({
    onChange,
    reservationSummary,
    adults = 0,
    ageGroups = {},
    startDate,
    endDate,
}) => {
    const [isHousingUnitModalOpen, setIsHousingUnitModalOpen] = useState(false)
    const companyId = useCurrentCompanyId()

    const handleOpenHousingUnitModal = () => {
        setIsHousingUnitModalOpen(true)
    }

    const { data: housingUnitType, isLoading: isLoadingHousingUnitType } =
        useGetHousingUnitTypeById(
            {
                companyId,
                id: reservationSummary?.housingUnitType.id || '',
            },
            {
                query: {
                    enabled: !!reservationSummary?.housingUnitType.id,
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
                        disabled={!startDate || !endDate}
                    >
                        {reservationSummary?.housingUnit?.id
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
                                            {`${dayjs
                                                .utc(endDate)
                                                .diff(
                                                    dayjs.utc(startDate),
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
                                        {formatCurrency(
                                            reservationSummary?.summary
                                                .basePrice ?? 0,
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <RateOptionsSection
                            onChange={(option) => {
                                if (!reservationSummary) return

                                onChange({
                                    ...reservationSummary,
                                    summary: {
                                        ...reservationSummary.summary,
                                        rateOption: option,
                                    },
                                })
                            }}
                            reservationSummary={reservationSummary}
                        />
                    </Box>
                )}
            </FormSection>

            <HousingUnitTypeModal
                open={isHousingUnitModalOpen}
                onClose={() => setIsHousingUnitModalOpen(false)}
                onSelect={(newReservationSummary, housingUnit) => {
                    onChange({ ...newReservationSummary, housingUnit })
                }}
                initialSelectedHousingUnitId={
                    reservationSummary?.housingUnit?.id || null
                }
                adults={adults}
                ageGroups={ageGroups}
                startDate={startDate}
                endDate={endDate}
            />
        </>
    )
}
