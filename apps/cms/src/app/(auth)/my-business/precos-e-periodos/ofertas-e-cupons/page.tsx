'use client'

import { Box, Skeleton, Stack } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Card } from '@/components/atoms/Card'
import { LinkButton } from '@/components/atoms/LinkButton'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'

import { OfferCouponCard } from './componentes/OfferCouponCard'
import { offerCouponsPaginated } from './utils/config'

export default function OfferCoupons() {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const { push } = useRouter()

    const chipItems = [
        { key: '1', label: 'Ativas' },
        { key: '2', label: 'Inativas' },
        { key: '3', label: 'Todas' },
    ]

    const OfferCoupons = offerCouponsPaginated
    const isLoading = false

    return (
        <div className="OfertasECupons">
            <PageHeader
                title="Ofertas e Cupons"
                backLButtonLabel="Preços e Períodos"
                backButtonHref="/my-business/precos-e-periodos"
                headerRight={
                    <LinkButton
                        href="/my-business/precos-e-periodos/ofertas-e-cupons/create"
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
                        : OfferCoupons?.items.map((offerCoupon) => (
                              <OfferCouponCard
                                  key={offerCoupon.id}
                                  onClick={
                                      (id) =>
                                          push(
                                              `/my-business/precos-e-periodos/ofertas-e-cupons`,
                                          ) //colocar redirect pro create
                                  }
                                  offerCoupon={offerCoupon}
                              />
                          ))}
                </Stack>
            </Box>
        </div>
    )
}
