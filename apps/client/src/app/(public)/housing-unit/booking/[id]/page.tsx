'use client'

import { useGetHousingUnitTypeById } from '@booksuite/sdk'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Container } from '@/components/organisms/Container'
import { ImageGallery } from '@/components/organisms/ImageGallery'

import { HousingUnitBookingForm } from './components/HousingUnitBookingForm'
import { HousingUnitTypeInfo } from './components/HousingUnitTypeInfo'

export default function BookingPage() {
    const { company } = useCurrentCompanyStore()
    const params = useParams()
    const id = params.id as string

    const { data: housingUnit } = useGetHousingUnitTypeById(
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

    const [isViewingAllPhotos, setIsViewingAllPhotos] = useState(false)

    const basePrice = housingUnit?.weekdaysPrice ?? 0

    return (
        <>
            <Container>
                <div className="w-full  mx-auto">
                    <div className="flex items-start w-full mb-2">
                        <a
                            href="/housing-unit"
                            className="text-primary-500 underline"
                        >
                            Voltar
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <HousingUnitTypeInfo
                                description={housingUnit?.description ?? ''}
                                images={
                                    housingUnit?.medias?.map(
                                        (media) => media.media.url,
                                    ) ?? []
                                }
                                facilities={housingUnit?.facilities ?? []}
                                maxGuests={housingUnit?.maxGuests ?? 0}
                                maxAdults={housingUnit?.maxAdults ?? 0}
                                maxChildren={housingUnit?.maxChildren ?? 0}
                                onViewAllPhotos={() =>
                                    setIsViewingAllPhotos(true)
                                }
                            />
                        </div>
                        <div className="flex-1">
                            <HousingUnitBookingForm
                                title={housingUnit?.name ?? ''}
                                housingUnitTypeId={housingUnit?.id ?? ''}
                                basePrice={basePrice}
                                maxGuests={housingUnit?.maxGuests ?? undefined}
                            />
                        </div>
                    </div>
                </div>
            </Container>

            <ImageGallery
                title={housingUnit?.name ?? ''}
                images={
                    housingUnit?.medias?.map((media) => media.media.url) ?? []
                }
                isOpen={isViewingAllPhotos}
                onClose={() => setIsViewingAllPhotos(false)}
            />
        </>
    )
}
