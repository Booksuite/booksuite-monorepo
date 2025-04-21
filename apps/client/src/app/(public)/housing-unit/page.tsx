'use client'

import { HousingUnitTypeFull, useSearchHousingUnitTypes } from '@booksuite/sdk'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { SmartBannerSearch } from '@/components/molecules/SmartBannerSearch'
import { Container } from '@/components/organisms/Container'
import { ImageGallery } from '@/components/organisms/ImageGallery'
import { Others } from '@/components/organisms/Others'
import { SectionSmartBannerSearch } from '@/components/organisms/SectionSmartBannerSearch'

import { HousingUnitTypeCard } from './components/HousingUnitTypeCard'

export default function HousingUnit() {
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
            <SectionSmartBannerSearch>
                <SmartBannerSearch showBookButton={false} />
            </SectionSmartBannerSearch>

            <Container>
                <div className="flex flex-col items-center gap-8">
                    <h1 className="text-2xl text-grey-primary font-bold">
                        Nossas Acomodações
                    </h1>
                    <div className="grid grid-cols-1 gap-8 w-full items-center justify-items-center">
                        {housingUnitTypes?.items?.map(
                            (unitType: HousingUnitTypeFull) => (
                                <HousingUnitTypeCard
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
                                    onReserve={() => unitType.id}
                                    onDetails={() => unitType.id}
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
                </div>
            </Container>
            <Others />

            <ImageGallery
                title={selectedUnit?.title ?? ''}
                images={selectedUnit?.images ?? []}
                isOpen={!!selectedUnit}
                onClose={() => setSelectedUnit(null)}
            />
        </>
    )
}
