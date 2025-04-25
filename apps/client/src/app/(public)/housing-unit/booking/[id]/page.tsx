'use client'

import {
    useGetCompanyHostingRules,
    useGetHousingUnitTypeById,
    useSearchSeasonRules,
} from '@booksuite/sdk'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { useCalendarPrices } from '@/common/hooks/useCalendarPrices'
import { Container } from '@/components/organisms/Container'
import { ImageGallery } from '@/components/organisms/ImageGallery'

import { HousingUnitBookingForm } from './components/HousingUnitBookingForm'
import { HousingUnitTypeInfo } from './components/HousingUnitTypeInfo'

export default function BookingPage() {
    const { company } = useCurrentCompanyStore()
    const params = useParams()
    const router = useRouter()
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

    const { data: hostingRules } = useGetCompanyHostingRules(
        { companyId: company?.id ?? '' },
        {
            query: {
                enabled: !!company?.id,
            },
        },
    )

    const { data: seasonRules } = useSearchSeasonRules(
        { companyId: company?.id ?? '' },
        {
            pagination: {
                page: 1,
                itemsPerPage: 100,
            },
        },
    )

    const prices = useCalendarPrices(
        housingUnit,
        seasonRules,
        hostingRules ?? undefined,
    ).generateCalendarPrices()

    const [isViewingAllPhotos, setIsViewingAllPhotos] = useState(false)

    const basePrice = housingUnit?.weekdaysPrice ?? 0
    const weekendPrice = housingUnit?.weekendPrice ?? basePrice

    const weekendDays = hostingRules?.availableWeekend ?? [6, 0]

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
                            <div className="sticky top-10">
                                <HousingUnitBookingForm
                                    title={housingUnit?.name ?? ''}
                                    housingUnitTypeId={housingUnit?.id ?? ''}
                                    basePrice={basePrice}
                                    weekendPrice={weekendPrice}
                                    maxGuests={
                                        housingUnit?.maxGuests ?? undefined
                                    }
                                    prices={prices}
                                    weekendDays={weekendDays}
                                />
                            </div>
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
