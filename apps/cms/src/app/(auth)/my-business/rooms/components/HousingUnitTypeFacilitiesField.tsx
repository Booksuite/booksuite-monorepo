import {
    Facility,
    HousingUnitTypeFacilityInput,
    useSearchFacilities,
} from '@booksuite/sdk'
import {
    Box,
    Flex,
    HStack,
    Stack,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { Button, useTheme } from '@mui/material'
import { useFormikContext } from 'formik'
import { useCallback, useMemo, useState } from 'react'

import { COMODITIES_TAB_FILTER } from '@/common/constants/facility'
import { FormSection } from '@/components/atoms/FormSection'
import { SelectModal } from '@/components/organisms/SelectModal'
import { MAX_FEATURED_FACILITIES } from '../constants'
import { RoomsFormData } from '../utils/config'

import { HousintUnitTypeFacilityItem } from './HousintUnitTypeFacilityItem'

export const HousingUnitTypeFacilitiesField = () => {
    const theme = useTheme()
    const toast = useToast()
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
                <HStack gap={2} align="center" justify="space-between">
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
                </HStack>

                <Flex gap={8}>
                    <Box flex={1}>
                        <Text fontWeight="bold" mb={3}>
                            Top 5 destaques no site
                        </Text>
                        <VStack align="stretch" spacing={2}>
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
                                <Flex
                                    key={index}
                                    align="center"
                                    justify="center"
                                    bg="gray.50"
                                    height={10}
                                    p={3}
                                    borderRadius="md"
                                    color="gray.300"
                                >
                                    Comodidade em destaque
                                </Flex>
                            ))}
                        </VStack>
                    </Box>

                    <Box
                        borderLeft="1px solid"
                        borderLeftColor={theme.palette.blueGrey[200]}
                        pl={8}
                        flex={1}
                    >
                        <Text fontWeight="bold" mb={3}>
                            Demais comodidades
                        </Text>
                        <VStack align="stretch" spacing={2}>
                            {nonFeaturedFacilities.map((facility) => (
                                <HousintUnitTypeFacilityItem
                                    key={facility.id}
                                    facility={facility}
                                    onClick={(item) => {
                                        if (
                                            featuredFacilities.length >=
                                            MAX_FEATURED_FACILITIES
                                        ) {
                                            return toast({
                                                title: `Você pode selecionar no máximo ${MAX_FEATURED_FACILITIES} comodidades destacadas`,
                                                status: 'warning',
                                            })
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
                                <Flex
                                    align="center"
                                    justify="center"
                                    bg="gray.50"
                                    p={3}
                                    borderRadius="md"
                                    color="gray.500"
                                >
                                    Nenhuma comodidade adicional
                                </Flex>
                            )}
                        </VStack>
                    </Box>
                </Flex>
            </Stack>
        </FormSection>
    )
}
