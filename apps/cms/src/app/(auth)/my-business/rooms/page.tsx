'use client'

import { useSearchHousingUnitTypes } from '@booksuite/sdk'
import { Box, Button, Link, Skeleton, Stack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

import { HousingUnitTypeCard } from './components/HousingUnitTypeCard'

const chipItems = [
    { key: '1', label: 'Ativas' },
    { key: '2', label: 'Inativas' },
    { key: '3', label: 'Todas' },
]

export default function Rooms() {
    const searchParams = useSearchParams()
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
    const itemsPerPage = searchParams.get('itemsPerPage')
        ? Number(searchParams.get('itemsPerPage'))
        : 10

    const companyId = useCurrentCompanyId()
    const { data: housingUnitTypes, isLoading } = useSearchHousingUnitTypes(
        { companyId },
        {
            pagination: { page, itemsPerPage },
        },
    )

    return (
        <div className="Acomodacoes">
            <PageHeader.Root>
                <PageHeader.BackLink href="/my-business">
                    Meu Negócio
                </PageHeader.BackLink>

                <PageHeader.Title>Acomodações</PageHeader.Title>
            </PageHeader.Root>

            <Box>
                <ChipFilter items={chipItems} />

                <Stack gap={4} my={4}>
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <Box key={index}>
                                  <Stack direction="row" gap={4}>
                                      <Skeleton h="72px" w="72px" />
                                      <Stack>
                                          <Skeleton h={4} w={150} />
                                          <Skeleton h={3} w={140} />
                                          <Skeleton h={3} w={135} />
                                      </Stack>
                                  </Stack>
                              </Box>
                          ))
                        : housingUnitTypes?.items.map((housingUnitType) => (
                              <HousingUnitTypeCard
                                  key={housingUnitType.id}
                                  housingUnitType={housingUnitType}
                              />
                          ))}
                </Stack>

                <Button
                    as={Link}
                    href="acomodacoes/criar"
                    className="mt-[2.5rem] w-full"
                    leftIcon={<Icons.Plus />}
                >
                    Adicionar Acomodação
                </Button>
            </Box>
        </div>
    )
}
