import { useGetCompanyAgePolicy } from '@booksuite/sdk'
import { Grid, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { ReservationMainFormData } from '../../utils/config'
import { HousingUnitTypeSection } from '../HousingUnitTypeSection'

export const ReservationMain = () => {
    const { values, setFieldValue, errors, setValues } =
        useFormikContext<ReservationMainFormData>()

    const companyId = useCurrentCompanyId()

    const { data: agePolicy } = useGetCompanyAgePolicy({ companyId })

    return (
        <>
            <FormSection title="Detalhes da reserva">
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Início da Estadia"
                            type="date"
                            fullWidth
                            value={values.startDate || ''}
                            onChange={(e) =>
                                setFieldValue('startDate', e.target.value)
                            }
                            error={!!errors.startDate}
                            helperText={errors.startDate}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Fim da Estadia"
                            type="date"
                            fullWidth
                            value={values.endDate || ''}
                            onChange={(e) =>
                                setFieldValue('endDate', e.target.value)
                            }
                            error={!!errors.endDate}
                            helperText={errors.endDate}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid>
                </Grid>

                <NumberInput
                    label="Adultos"
                    value={values.adults}
                    min={0}
                    disabled={values.startDate && values.endDate ? false : true}
                    onChange={(e) => {
                        const newValueNumber = Number(e.target.value)
                        if (Number.isNaN(newValueNumber)) return
                        setFieldValue('adults', newValueNumber)
                    }}
                />

                {agePolicy?.ageGroups.map((policyAgeGroup) => {
                    const quantity = values.ageGroups[policyAgeGroup.id] ?? 0

                    return (
                        <NumberInput
                            key={policyAgeGroup.id}
                            min={0}
                            label={`Crianças (${policyAgeGroup.initialAge} a ${policyAgeGroup.finalAge})`}
                            disabled={
                                values.startDate && values.endDate
                                    ? false
                                    : true
                            }
                            value={quantity}
                            onChange={(e) => {
                                setFieldValue('ageGroups', {
                                    ...values.ageGroups,
                                    [policyAgeGroup.id]: Number(e.target.value),
                                })
                            }}
                        />
                    )
                })}
            </FormSection>

            <HousingUnitTypeSection
                onChange={({ housingUnit, housingUnitType, summary }) => {
                    setValues((prev) => ({
                        ...prev,
                        summary: {
                            housingUnit,
                            housingUnitType,
                            summary,
                        },
                    }))
                }}
                adults={values.adults}
                ageGroups={values.ageGroups}
                startDate={values.startDate}
                endDate={values.endDate}
                reservationSummary={values.summary}
            />
        </>
    )
}
