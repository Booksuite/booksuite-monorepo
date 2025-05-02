'use client'

import { useSearchServices } from '@booksuite/sdk'
import { ServiceFull } from '@booksuite/sdk/src/gen/types/ServiceFull'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { SmartBannerSearch } from '@/components/molecules/SmartBannerSearch'
import { Container } from '@/components/organisms/Container'
import { ImageGallery } from '@/components/organisms/ImageGallery'
import { SectionSmartBannerSearch } from '@/components/organisms/SectionSmartBannerSearch'

import { ServicesCard } from './components/ServicesCard'

export default function ServicesPage() {
    const { company } = useCurrentCompanyStore()
    const router = useRouter()
    const [selectedService, setSelectedService] = useState<{
        title: string
        images: string[]
    } | null>(null)

    const { data: services } = useSearchServices(
        {
            companyId: company?.id ?? '',
        },
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
                        Nossos Serviços
                    </h1>
                    <div className="grid grid-cols-2 gap-8 w-full items-center justify-items-center">
                        {services?.items?.map((service: ServiceFull) => (
                            <ServicesCard
                                key={service.id}
                                title={service.name ?? ''}
                                description={service.description ?? ''}
                                images={
                                    service.medias?.map(
                                        (media) => media.media.url,
                                    ) ?? ['/placeholder.svg']
                                }
                                price={service.price ?? 0}
                                hasOffer={true}
                                originalPrice={service.price ?? 0}
                                onAddService={() => {
                                    router.push(
                                        `/services/details/${service.id}`,
                                    )
                                }}
                                onViewAllPhotos={() => {
                                    setSelectedService({
                                        title: service.name ?? '',
                                        images: service.medias?.map(
                                            (media) => media.media.url,
                                        ) ?? ['/placeholder.svg'],
                                    })
                                }}
                            />
                        ))}
                    </div>
                </div>
            </Container>

            <ImageGallery
                title={selectedService?.title ?? ''}
                images={selectedService?.images ?? []}
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
            />
        </>
    )
}
