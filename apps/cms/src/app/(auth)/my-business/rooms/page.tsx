'use client'

import { useSearchHousingUnitTypes } from '@booksuite/sdk'
import { Box, Skeleton, Stack } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { Card } from '@/components/atoms/Card'
import { LinkButton } from '@/components/atoms/LinkButton'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'

import { HousingUnitTypeCard } from './components/HousingUnitTypeCard'

const chipItems = [
    { key: 'published', label: 'Publicadas' },
    { key: 'unpublished', label: 'Não publicadas' },
]

export default function Rooms() {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
    const itemsPerPage = searchParams.get('itemsPerPage')
        ? Number(searchParams.get('itemsPerPage'))
        : 10

    const companyId = useCurrentCompanyId()
    const { data: housingUnitTypes, isLoading } = useSearchHousingUnitTypes(
        { companyId },
        {
            pagination: { page, itemsPerPage },
            filter:
                selectedFilters.length > 0
                    ? {
                          published: selectedFilters.includes('published'),
                      }
                    : undefined,
        },
    )

    return (
        <div className="Acomodacoes">
            <PageHeader
                title="Acomodações"
                backLButtonLabel="Meu Negócio"
                backButtonHref="/my-business"
                headerRight={
                    <LinkButton
                        href="/my-business/rooms/create"
                        leftIcon={<Plus size={16} />}
                    >
                        Adicionar
                    </LinkButton>
                }
            />

            <Box>
                <ChipFilter
                    items={chipItems}
                    value={selectedFilters}
                    onChange={setSelectedFilters}
                />

                <Stack gap={4} my={4}>
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <Card.Container key={index}>
                                  <Card.Section>
                                      <Skeleton
                                          borderRadius="md"
                                          h="72px"
                                          w="72px"
                                      />
                                  </Card.Section>
                                  <Card.Section flex={1}>
                                      <Skeleton h={4} w={170} />
                                      <Skeleton h={3} w={140} />
                                      <Skeleton h={3} w={122} />
                                      <Skeleton h={3} w={135} />
                                  </Card.Section>
                              </Card.Container>
                          ))
                        : housingUnitTypes?.items.map((housingUnitType) => (
                              <HousingUnitTypeCard
                                  key={housingUnitType.id}
                                  onClick={(id) =>
                                      push(`/my-business/rooms/${id}`)
                                  }
                                  housingUnitType={housingUnitType}
                              />
                          ))}
                </Stack>
            </Box>
        </div>
    )
}
