import {
    RateOptionFull,
    ReservationSummaryInput,
    useSearchRateOption,
} from '@booksuite/sdk'
import { Stack, Typography } from '@mui/material'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormSection } from '@/components/atoms/FormSection'

import { RateOptionItem } from './RateOptionItem'

interface RateOptionsSectionProps {
    onChange: (option: RateOptionFull) => void
    reservationSummary: ReservationSummaryInput | null
}

export const RateOptionsSection: React.FC<RateOptionsSectionProps> = ({
    onChange,
    reservationSummary,
}) => {
    const companyId = useCurrentCompanyId()

    const { data: rateOptions, isLoading } = useSearchRateOption(
        {
            companyId,
        },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: {
                published: true,
                housingUnitTypeIds: [
                    reservationSummary?.housingUnitType.id || '',
                ],
            },
            order: {
                orderBy: 'additionalAdultPrice',
                direction: 'asc',
            },
        },
        undefined,
        {
            query: {
                enabled: !!reservationSummary?.housingUnitType.id,
            },
        },
    )

    const handleOptionChange = (option: RateOptionFull) => {
        onChange(option)
    }

    return (
        <FormSection title="Tipo de tarifa" isLoading={isLoading}>
            <Stack gap={2}>
                {rateOptions?.items.map((option) => {
                    const isSelected =
                        reservationSummary?.summary.rateOption?.id === option.id

                    return (
                        <RateOptionItem
                            key={option.id}
                            rateOption={option}
                            selected={isSelected}
                            onClick={handleOptionChange}
                        />
                    )
                }) || (
                    <Typography variant="body2" color="text.secondary">
                        Nenhuma tarifa encontrada
                    </Typography>
                )}
            </Stack>
        </FormSection>
    )
}
