import {
    Facility,
    HousingUnitTypeFacilityInput,
    useSearchFacilities,
} from '@booksuite/sdk'
import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { useFormikContext } from 'formik'
import { useSnackbar } from 'notistack'
import { useCallback, useMemo, useState } from 'react'

import { COMODITIES_TAB_FILTER } from '@/common/constants/facility'
import { FormSection } from '@/components/atoms/FormSection'
import { SelectModal } from '@/components/organisms/SelectModal'
import { MAX_FEATURED_FACILITIES } from '../constants'
import { RoomsFormData } from '../utils/config'

import { HousintUnitTypeFacilityItem } from './HousintUnitTypeFacilityItem'

export const HousingUnitTypeFacilitiesField = () => {
    const theme = useTheme()
    const { enqueueSnackbar } = useSnackbar()
    const [isOpen, setIsOpen] = useState(false)
    const { values, setFieldValue } = useFormikContext<RoomsFormData>()

    const { data: facilities } = useSearchFacilities({
        pagination: {
            page: 1,
            itemsPerPage: 1000,
        },
    })

    const getFacilities = useCallback(
        (facilityInputs: HousingUnitTypeFacilityInput[]): Facility[] => {
            if (!facilities?.items) return []

            const facilityIds = new Set(
                facilityInputs.map((input) => input.facilityId),
            )

            return facilities.items.filter((facility) =>
                facilityIds.has(facility.id),
            )
        },
        [facilities],
    )
    const allFacilities = useMemo(() => {
        return getFacilities(values.facilities)
    }, [values.facilities, getFacilities])

    const featuredFacilities = useMemo(() => {
        return getFacilities(values.facilities.filter((f) => f.isFeatured))
    }, [values.facilities, getFacilities])

    const nonFeaturedFacilities = useMemo(() => {
        return getFacilities(values.facilities.filter((f) => !f.isFeatured))
    }, [values.facilities, getFacilities])

    return (
        <FormSection
            title="Comodidades"
            variant="outlined"
            rightAction={
                <Button onClick={() => setIsOpen(true)}>
                    {values.facilities.length > 0 ? 'Adicionar' : 'Selecionar'}
                </Button>
            }
        >
            <Stack>
                <Stack
                    direction="row"
                    gap={2}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {!!facilities && (
                        <SelectModal
                            items={facilities.items}
                            initialSelectedItems={allFacilities}
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            onSelect={(items) => {
                                setFieldValue(
                                    'facilities',
                                    items.map<HousingUnitTypeFacilityInput>(
                                        (facility) => ({
                                            facilityId: facility.id,
                                            isFeatured: false,
                                        }),
                                    ),
                                )
                            }}
                            tabFilter={COMODITIES_TAB_FILTER}
                            filterGetter={(item) => item.category}
                            title="Comodidades"
                            description="Selecione as opções"
                        />
                    )}
                </Stack>

                <Stack direction="row" gap={8}>
                    <Box flex={1}>
                        <Typography fontWeight="bold" mb={3}>
                            Top 5 destaques no site
                        </Typography>
                        <Stack spacing={2}>
                            {featuredFacilities.slice(0, 5).map((facility) => (
                                <HousintUnitTypeFacilityItem
                                    key={facility.id}
                                    facility={facility}
                                    isFeatured
                                    onClick={(item) => {
                                        const facilityIndex =
                                            values.facilities.findIndex(
                                                (f) => f.facilityId === item.id,
                                            )

                                        const newFacilities = [
                                            ...values.facilities,
                                        ]

                                        newFacilities[facilityIndex] = {
                                            ...newFacilities[facilityIndex]!,
                                            isFeatured: false,
                                        }

                                        setFieldValue(
                                            'facilities',
                                            newFacilities,
                                        )
                                    }}
                                />
                            ))}
                            {Array.from({
                                length:
                                    MAX_FEATURED_FACILITIES -
                                    featuredFacilities.length,
                            }).map((_, index) => (
                                <Box
                                    key={index}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    bgcolor="grey.50"
                                    height={40}
                                    p={3}
                                    borderRadius={1}
                                    color="grey.300"
                                >
                                    Comodidade em destaque
                                </Box>
                            ))}
                        </Stack>
                    </Box>

                    <Box
                        borderLeft="1px solid"
                        borderColor={theme.palette.grey[300]}
                        pl={8}
                        flex={1}
                    >
                        <Typography fontWeight="bold" mb={3}>
                            Demais comodidades
                        </Typography>
                        <Stack spacing={2}>
                            {nonFeaturedFacilities.map((facility) => (
                                <HousintUnitTypeFacilityItem
                                    key={facility.id}
                                    facility={facility}
                                    onClick={(item) => {
                                        if (
                                            featuredFacilities.length >=
                                            MAX_FEATURED_FACILITIES
                                        ) {
                                            return enqueueSnackbar(
                                                `Você pode selecionar no máximo ${MAX_FEATURED_FACILITIES} comodidades destacadas`,
                                                { variant: 'warning' },
                                            )
                                        }

                                        const facilityIndex =
                                            values.facilities.findIndex(
                                                (f) => f.facilityId === item.id,
                                            )

                                        const newFacilities = [
                                            ...values.facilities,
                                        ]

                                        newFacilities[facilityIndex] = {
                                            ...newFacilities[facilityIndex]!,
                                            isFeatured: true,
                                        }

                                        setFieldValue(
                                            'facilities',
                                            newFacilities,
                                        )
                                    }}
                                />
                            ))}
                            {nonFeaturedFacilities.length === 0 && (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    bgcolor="grey.50"
                                    p={3}
                                    borderRadius={1}
                                    color="grey.500"
                                >
                                    Nenhuma comodidade adicional
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </FormSection>
    )
}
