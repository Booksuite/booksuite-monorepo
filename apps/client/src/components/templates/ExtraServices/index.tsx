import { ServiceFull, useSearchServices } from '@booksuite/sdk'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Container } from '@/components/organisms/Container'
import { ImageGallery } from '@/components/organisms/ImageGallery'

import { ExtraServicesCard } from './components/ExtraServicesCard'

export const ExtraServices: React.FC = () => {
    const { company } = useCurrentCompanyStore()
    const [selectedService, setSelectedService] = useState<{
        title: string
        images: string[]
    } | null>(null)

    const { data: service } = useSearchServices(
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
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold text-grey-primary mb-3">
                        Serviços Extras
                    </h2>
                    <div className="text-grey-secondary text-lg">
                        <span>Complete sua estadia com itens adicionais</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {service?.items?.map((services: ServiceFull) => (
                        <ExtraServicesCard
                            key={services.id}
                            title={services.name ?? ''}
                            description={services.description ?? ''}
                            images={
                                services.medias?.map(
                                    (media) => media.media.url,
                                ) ?? ['/placeholder.svg']
                            }
                            price={services.price ?? 0}
                            originalPrice={services.price * 1.15}
                            onQuantityChange={() => {}}
                            onViewAllPhotos={() => {
                                setSelectedService({
                                    title: services.name ?? '',
                                    images: services.medias?.map(
                                        (media) => media.media.url,
                                    ) ?? ['/placeholder.svg'],
                                })
                            }}
                        />
                    ))}
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
