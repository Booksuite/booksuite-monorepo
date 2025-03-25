'use client'

import {
    CompanyFacilityInput,
    Facility,
    useSearchFacilities,
} from '@booksuite/sdk'
import { HStack, Stack, useToast } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { useCallback, useMemo } from 'react'

import { SelectBox } from '@/components/organisms/SelectBox'
import { CompanyFacilitiesData } from '../utils/config'

export const CompanyFacilitiesField: React.FC = () => {
    const toast = useToast()
    const { values, setFieldValue } = useFormikContext<CompanyFacilitiesData>()

    const { data: facilities, isLoading } = useSearchFacilities({
        pagination: {
            page: 1,
            itemsPerPage: 1000,
        },
        filter: {
            type: 'COMPANY',
        },
    })

    const getFacilities = useCallback(
        (facilityInputs: CompanyFacilityInput[]): Facility[] => {
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

    return (
        <section>
            <Stack
                p={6}
                sx={{
                    border: '1px solid #D9E2EC',
                    borderRadius: '8px',
                }}
            >
                <HStack gap={2} align="center" justify="space-between">
                    <h2>Comodidades do Negócio</h2>    

                    {!!facilities && (
                        <SelectBox
                            items={facilities.items}
                            openModalButtonText={
                                values.facilities.length > 0
                                    ? 'Adicionar'
                                    : 'Selecionar'
                            }
                            onSelect={(items) => {
                                setFieldValue(
                                    'facilities',
                                    items.map<CompanyFacilityInput>(
                                        (facility) => ({
                                            facilityId: facility.id,
                                            isFeatured: false,
                                        }),
                                    ),
                                )
                            }}
                        ></SelectBox>
                    )}
                </HStack>
            </Stack>
        </section>
    )
}
