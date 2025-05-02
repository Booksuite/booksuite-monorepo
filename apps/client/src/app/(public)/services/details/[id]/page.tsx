'use client'

import { useGetServiceById, useSearchServices } from '@booksuite/sdk'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Container } from '@/components/organisms/Container'
import { ImageGallery } from '@/components/organisms/ImageGallery'
import { Others } from '@/components/organisms/Others'
import { ReceiveOurPromotions } from '@/components/organisms/ReceiveOurPromotions'
import { HousingUnitTypeCardTemplate } from '@/components/templates/HousingUnitTypeCardTemplate'

import { OtherService } from './components/OtherService'
import { ServicesBooking } from './components/ServicesBooking'
import { ServicesInfo } from './components/ServicesInfo'

export default function ServiceDetailsPage() {
    const { company } = useCurrentCompanyStore()
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const { data: service } = useGetServiceById(
        {
            companyId: company?.id ?? '',
            id,
        },
        {
            query: {
                enabled: !!company?.id && !!id,
            },
        },
    )

    const { data: servicesData } = useSearchServices(
        { companyId: company?.id ?? '' },
        {
            filter: {
                published: true,
            },
            pagination: { page: 1, itemsPerPage: 12 },
        },
        undefined,
        {
            query: {
                enabled: !!company?.id,
            },
        },
    )

    const [isViewingAllPhotos, setIsViewingAllPhotos] = useState(false)

    return (
        <>
            <Container>
                <div className="w-full  mx-auto">
                    <div className="flex items-start w-full mb-2">
                        <button
                            onClick={() => router.back()}
                            className="text-primary-500 underline"
                        >
                            Voltar
                        </button>
                    </div>
                    <div className="flex flex-row gap-4">
                        <ServicesInfo
                            onViewAllPhotos={() => {
                                setIsViewingAllPhotos(true)
                            }}
                            description={service?.description ?? ''}
                            generalInfo={service?.notes ?? ''}
                            images={
                                service?.medias?.map(
                                    (media) => media.media.url,
                                ) ?? []
                            }
                        />
                        <ServicesBooking
                            name={service?.name ?? ''}
                            prices={service?.price ?? 0}
                            billingType={service?.billingType ?? ''}
                        />
                    </div>
                </div>
            </Container>

            <div className="w-full h-16 border-t border-gray-secondary" />

            {servicesData?.items && service?.id && (
                <OtherService
                    services={servicesData.items}
                    currentServiceId={service.id}
                />
            )}
            <HousingUnitTypeCardTemplate />
            <ReceiveOurPromotions />
            <Others />

            <ImageGallery
                title={service?.name ?? ''}
                images={service?.medias?.map((media) => media.media.url) ?? []}
                isOpen={isViewingAllPhotos}
                onClose={() => setIsViewingAllPhotos(false)}
            />
        </>
    )
}
