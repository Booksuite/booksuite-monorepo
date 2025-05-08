import type { HousingUnitTypeFull } from '@booksuite/sdk'
import { useSearchHousingUnitTypes } from '@booksuite/sdk'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Container } from '@/components/organisms/Container'
import { ImageGallery } from '@/components/organisms/ImageGallery'

import { HousingUnitTypeCardComponent } from './HousingUnitTypeCardComponent'

export const HousingUnitTypeCard: React.FC = () => {
    const router = useRouter()

    const { company } = useCurrentCompanyStore()
    const [selectedUnit, setSelectedUnit] = useState<{
        title: string
        images: string[]
    } | null>(null)

    const { data: housingUnitTypes } = useSearchHousingUnitTypes(
        { companyId: company?.id ?? '' },
        {
            filter: {
                published: true,
            },
            pagination: {
                page: 1,
                itemsPerPage: 10,
            },
        },
        undefined,
        {
            query: {
                enabled: !!company?.id,
            },
        },
    )

    return (
        <>
            <Container>
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl text-grey-primary font-bold mb-4">
                        Nossas Acomodações
                    </h2>
                    <div className="flex text-grey-secondary items-center">
                        <span>Escolha uma de nossas opções</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8 w-full">
                    {housingUnitTypes?.items?.map(
                        (unitType: HousingUnitTypeFull) => (
                            <HousingUnitTypeCardComponent
                                key={unitType.id}
                                title={unitType.name ?? ''}
                                description={unitType.description ?? ''}
                                images={
                                    unitType.medias?.map(
                                        (media) => media.media.url,
                                    ) ?? ['/placeholder.svg']
                                }
                                facilities={unitType.facilities ?? []}
                                maxGuests={unitType.maxGuests ?? 1}
                                onReserve={() =>
                                    router.push(
                                        `/housing-unit/booking/${unitType.id}`,
                                    )
                                }
                                onDetails={() =>
                                    router.push(
                                        `/housing-unit/details/${unitType.id}`,
                                    )
                                }
                                onViewAllPhotos={() => {
                                    setSelectedUnit({
                                        title: unitType.name ?? '',
                                        images: unitType.medias?.map(
                                            (media) => media.media.url,
                                        ) ?? ['/placeholder.svg'],
                                    })
                                }}
                            />
                        ),
                    )}
                </div>
            </Container>

            <ImageGallery
                title={selectedUnit?.title ?? ''}
                images={selectedUnit?.images ?? []}
                isOpen={!!selectedUnit}
                onClose={() => setSelectedUnit(null)}
            />
        </>
    )
}
