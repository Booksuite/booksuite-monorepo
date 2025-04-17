import type { HousingUnitTypeFull } from '@booksuite/sdk'
import { useSearchHousingUnitTypes } from '@booksuite/sdk'
import React from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'

import { HousingUnitTypeCard } from './components/HousingUnitTypeCard'

export const HousingUnitType: React.FC = () => {
    const { company } = useCurrentCompanyStore()

    const { data: housingUnitTypes } = useSearchHousingUnitTypes(
        { companyId: company?.id ?? '' },
        {
            filter: {},
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
        <div className="container mx-auto px-4 py-16 flex flex-col gap-20 items-center">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4">Nossas Acomodações</h2>
                <div className="flex items-center">
                    <span>Escolha uma de nossas opções</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-8 w-full">
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
                            onReserve={() => unitType.id}
                            onDetails={() => unitType.id}
                        />
                    ),
                )}
            </div>
        </div>
    )
}
