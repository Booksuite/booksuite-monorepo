import {
    Offer,
    ServiceFull,
    useSearchOffers,
    useSearchServices,
    useSearchSpecialDates,
} from '@booksuite/sdk'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Container } from '@/components/organisms/Container'
import { ImageGallery } from '@/components/organisms/ImageGallery'

import { ServicesCardComponent } from './ServicesCardComponent'

const PRICE_VARIATION = {
    PERCENTAGE_REDUCTION: 'PERCENTAGE_REDUCTION',
    PERCENTAGE_INCREASE: 'PERCENTAGE_INCREASE',
} as const

interface ValidService {
    service: {
        id: string
    }
}

interface OfferWithValidServices extends Offer {
    validServices: ValidService[]
}
export const ServicesCard: React.FC = () => {
    const { company: currentCompany } = useCurrentCompanyStore()
    const [selectedService, setSelectedService] = useState<ServiceFull | null>(
        null,
    )

    const { data: services } = useSearchServices(
        { companyId: currentCompany?.id ?? '' },
        {
            pagination: {
                page: 1,
                itemsPerPage: 10,
            },
            filter: {
                published: true,
            },
        },
        undefined,
        {
            query: {
                enabled: !!currentCompany?.id,
            },
        },
    )

    const { data: offers } = useSearchOffers(
        { companyId: currentCompany?.id ?? '' },
        {
            pagination: {
                page: 1,
                itemsPerPage: 10,
            },
            filter: {
                published: true,
            },
        },
        undefined,
        {
            query: {
                enabled: !!currentCompany?.id,
            },
        },
    ) as { data: { items: OfferWithValidServices[] } }

    const { data: specialDates } = useSearchSpecialDates(
        { companyId: currentCompany?.id ?? '' },
        {
            pagination: {
                page: 1,
                itemsPerPage: 10,
            },
            filter: {
                published: true,
            },
        },
        undefined,
        {
            query: {
                enabled: !!currentCompany?.id,
            },
        },
    )

    const calculateFinalPrice = (service: ServiceFull) => {
        let finalPrice = service.price ?? 0
        const originalPrice = service.price ?? 0
        let hasOffer = false
        let maxDiscount = 0

        specialDates?.items?.forEach((specialDate) => {
            if (
                specialDate.includedServices?.some(
                    (s) => s.service.id === service.id,
                )
            ) {
                if (
                    specialDate.priceVariationType ===
                    PRICE_VARIATION.PERCENTAGE_REDUCTION
                ) {
                    finalPrice *= 1 - (specialDate.price ?? 0) / 100
                    maxDiscount = Math.max(maxDiscount, specialDate.price ?? 0)
                    hasOffer = true
                } else if (
                    specialDate.priceVariationType ===
                    PRICE_VARIATION.PERCENTAGE_INCREASE
                ) {
                    finalPrice *= 1 + (specialDate.price ?? 0) / 100
                }
            }
        })

        offers?.items?.forEach((offer) => {
            const validServices = offer.validServices
            if (validServices?.some((s) => s.service.id === service.id)) {
                if (
                    offer.priceAdjustmentType ===
                    PRICE_VARIATION.PERCENTAGE_REDUCTION
                ) {
                    finalPrice *= 1 - (offer.priceAdjustmentValue ?? 0) / 100
                    maxDiscount = Math.max(
                        maxDiscount,
                        offer.priceAdjustmentValue ?? 0,
                    )
                    hasOffer = true
                } else if (
                    offer.priceAdjustmentType ===
                    PRICE_VARIATION.PERCENTAGE_INCREASE
                ) {
                    finalPrice *= 1 + (offer.priceAdjustmentValue ?? 0) / 100
                }
            }
        })

        return {
            finalPrice,
            originalPrice:
                finalPrice !== originalPrice ? originalPrice : undefined,
            hasOffer,
            discount: hasOffer ? maxDiscount : undefined,
        }
    }

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
                    {services?.items?.map((service: ServiceFull) => {
                        const {
                            finalPrice,
                            originalPrice,
                            hasOffer,
                            discount,
                        } = calculateFinalPrice(service)
                        return (
                            <ServicesCardComponent
                                key={service.id}
                                title={service.name ?? ''}
                                description={service.description ?? ''}
                                images={
                                    service.medias?.map(
                                        (media) => media.media.url,
                                    ) ?? ['/placeholder.svg']
                                }
                                price={finalPrice}
                                originalPrice={originalPrice}
                                hasOffer={hasOffer}
                                discount={discount}
                                onQuantityChange={() => {}}
                                onViewAllPhotos={() => {
                                    setSelectedService(service)
                                }}
                            />
                        )
                    })}
                </div>
            </Container>

            <ImageGallery
                title={selectedService?.name ?? ''}
                images={
                    selectedService?.medias?.map(
                        (media) => media.media.url,
                    ) ?? ['/placeholder.svg']
                }
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
            />
        </>
    )
}
