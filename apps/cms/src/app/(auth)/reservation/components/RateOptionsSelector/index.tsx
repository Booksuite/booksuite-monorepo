import { RateOptionFull, useSearchRateOption } from '@booksuite/sdk'
import { Stack, Typography } from '@mui/material'
import { useFormikContext } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormSection } from '@/components/atoms/FormSection'
import {
    ReservationFormData,
    transformAgeGroupObjToArray,
} from '../../utils/config'
import {
    calculateRateOptionPrice,
    calculateTotalStay,
} from '../../utils/helpers'

import { RateOptionItem } from './RateOptionItem'

export const RateOptionsSelector: React.FC = () => {
    const companyId = useCurrentCompanyId()
    const { values, setValues } = useFormikContext<ReservationFormData>()

    const { data: rateOptions, isLoading } = useSearchRateOption(
        {
            companyId,
        },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: {
                published: true,
                housingUnitTypeIds: [values.housingUnitTypeId],
            },
        },
        undefined,
        {
            query: {
                enabled: !!values.housingUnitTypeId,
            },
        },
    )

    const handleOptionChange = (option: RateOptionFull) => {
        const newPrice = calculateRateOptionPrice(
            option,
            values.adults,
            transformAgeGroupObjToArray(values.ageGroups),
            calculateTotalStay(values.startDate, values.endDate),
        )

        setValues((prev) => ({
            ...prev,
            rateOptionPrice: newPrice,
            rateOptionId: option.id,
            rateOption: option,
        }))
    }

    return (
        <FormSection title="Tipo de tarifa" isLoading={isLoading}>
            <Stack gap={2}>
                {rateOptions?.items.map((option) => {
                    const isSelected = values.rateOptionId === option.id

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
