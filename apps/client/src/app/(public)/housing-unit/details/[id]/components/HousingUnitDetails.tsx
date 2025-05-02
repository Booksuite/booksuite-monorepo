'use client'

import {
    useGetCompanyHostingRules,
    useGetHousingUnitTypeById,
    useSearchHousingUnitTypes,
    useSearchSeasonRules,
} from '@booksuite/sdk'
import { ChevronRight, Gift, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { AvailabilityCalendar } from '@/app/(public)/housing-unit/details/[id]/components/AvailabilityCalendar'
import { useCurrentCompanyId } from '@/common/contexts/company'
import { useCalendarPrices } from '@/common/hooks/useCalendarPrices'
import { ImageGallery } from '@/components/organisms/ImageGallery'
import { useDynamicLucideIcon } from '@/providers/DynamicIconProvider'

import { SearchAvailability } from './SearchAvailability'

export function HousingUnitDetails() {
    const DynamicLucideIcon = useDynamicLucideIcon()
    const { id } = useParams()
    const companyId = useCurrentCompanyId()
    const [selectedImages, setSelectedImages] = useState<{
        title: string
        images: string[]
    } | null>(null)

    const { data: housingUnit } = useGetHousingUnitTypeById({
        id: id as string,
        companyId: companyId,
    })

    const { data: housingUnitTypes } = useSearchHousingUnitTypes(
        { companyId },
        {
            pagination: {
                page: 1,
                itemsPerPage: 100,
            },
        },
    )

    const { data: companyHostingRules } = useGetCompanyHostingRules({
        companyId: companyId,
    })

    const { data: seasonRules } = useSearchSeasonRules(
        { companyId },
        {
            pagination: {
                page: 1,
                itemsPerPage: 100,
            },
        },
    )

    const { generateCalendarPrices } = useCalendarPrices(
        housingUnit,
        seasonRules,
        companyHostingRules ?? undefined,
    )

    if (!housingUnit || !housingUnitTypes) {
        return <div>Carregando...</div>
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="relative">
                <div className="grid grid-cols-4 gap-2 h-[480px]">
                    <div
                        className="col-span-2 row-span-2 relative cursor-pointer rounded-l-lg overflow-hidden"
                        onClick={() =>
                            setSelectedImages({
                                title: housingUnit.name || '',
                                images:
                                    housingUnit.medias?.map(
                                        (m) => m.media.url,
                                    ) ?? [],
                            })
                        }
                    >
                        {housingUnit.medias?.[0] && (
                            <Image
                                fill
                                src={housingUnit.medias[0].media.url}
                                alt={`${housingUnit.name} - Imagem principal`}
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                priority
                            />
                        )}
                    </div>

                    {housingUnit.medias?.slice(1, 5).map((media, index) => (
                        <div
                            key={media.id}
                            className={`relative cursor-pointer overflow-hidden ${
                                index === 2
                                    ? 'rounded-tr-lg'
                                    : index === 3
                                      ? 'rounded-br-lg'
                                      : ''
                            }`}
                            onClick={() =>
                                setSelectedImages({
                                    title: housingUnit.name || '',
                                    images:
                                        housingUnit.medias?.map(
                                            (m) => m.media.url,
                                        ) ?? [],
                                })
                            }
                        >
                            <Image
                                fill
                                src={media.media.url}
                                alt={`${housingUnit.name} - Imagem ${index + 2}`}
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-start gap-2">
                <div className="flex flex-col gap-2 w-full max-w-[70%]">
                    <div className="flex items-center gap-3 justify-between">
                        <h1 className="text-3xl font-medium mb-2">
                            {housingUnit.name}
                        </h1>
                        <div
                            className="flex items-center mr-[7%] cursor-pointer border border-grey-600 rounded-full p-2"
                            onClick={() => {}}
                        >
                            <Share2 className="w-6 h-6 text-grey-600" />
                        </div>
                    </div>
                    <p className="text-grey-600 max-w-[90%]">
                        {housingUnit.description}
                    </p>

                    <div className="w-[90%] h-[2px] mt-7 mb-7 bg-grey-200" />

                    <div className="flex flex-col gap-8">
                        {housingUnit.facilities.length > 0 && (
                            <>
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl font-medium">
                                        Principais Comodidades
                                    </h2>
                                    <div className="grid grid-cols-5 gap-4">
                                        {housingUnit.facilities
                                            ?.filter(
                                                (facility) =>
                                                    facility.isFeatured,
                                            )
                                            .map((facility) => (
                                                <div
                                                    key={facility.id}
                                                    className="flex flex-col items-center gap-2 text-center border border-grey-200 rounded-lg p-2"
                                                >
                                                    <div className="w-12 h-12 flex items-center justify-center">
                                                        {facility.facility
                                                            .icon && (
                                                            <DynamicLucideIcon
                                                                iconName={
                                                                    facility
                                                                        .facility
                                                                        .icon
                                                                }
                                                                className="w-8 h-8"
                                                            />
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-grey-primary">
                                                        {facility.facility.name}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl font-medium">
                                        Outras Comodidades
                                    </h2>
                                    <div className="grid grid-cols-5">
                                        {housingUnit.facilities
                                            ?.filter(
                                                (facility) =>
                                                    !facility.isFeatured,
                                            )
                                            .map((facility) => (
                                                <div
                                                    key={facility.id}
                                                    className="text-grey-secondary"
                                                >
                                                    {facility.facility.name}
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                <div className="w-[90%] h-[2px] mt-7 mb-7 bg-grey-200" />
                            </>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-medium">
                            Informações de hóspedes
                        </h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-md text-grey-primary">
                                    • Máximo de hóspedes:
                                </span>
                                <span className="text-md text-grey-primary">
                                    {housingUnit.maxGuests}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-md text-grey-primary">
                                    • Máximo de Adultos:
                                </span>
                                <span className="text-md text-grey-primary">
                                    {housingUnit.maxAdults}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-md text-grey-primary">
                                    • Máximo de crianças:
                                </span>
                                <span className="text-md text-grey-primary">
                                    {housingUnit.maxChildren}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="w-[90%] h-[2px] mt-7 mb-7 bg-grey-200" />

                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-medium">
                            Regras de hospedagem
                        </h2>
                        <span className="text-grey-secondary">
                            • Check-in:{' '}
                            {companyHostingRules?.checkIn
                                ? `${Math.floor(companyHostingRules.checkIn / 60)}:${String(companyHostingRules.checkIn % 60).padStart(2, '0')}`
                                : 'Não definido'}
                        </span>
                        <span className="text-grey-secondary">
                            • Check-out:{' '}
                            {companyHostingRules?.checkOut
                                ? `${Math.floor(companyHostingRules.checkOut / 60)}:${String(companyHostingRules.checkOut % 60).padStart(2, '0')}`
                                : 'Não definido'}
                        </span>
                    </div>

                    <div className="flex flex-row justify-between mt-4 items-center w-[90%]">
                        <a className="text-grey-primary underline cursor-pointer">
                            Políticas de reservas, cancelamento e cookies
                        </a>
                        <ChevronRight className="w-6 h-6 text-grey-primary" />
                    </div>

                    <div className="w-[90%] h-[2px] mt-7 mb-7 bg-grey-200" />

                    <div className="w-[90%]">
                        <AvailabilityCalendar
                            housingUnitTypes={housingUnitTypes.items.map(
                                (unit) => ({
                                    id: unit.id,
                                    name: unit.name || '',
                                    prices: generateCalendarPrices(unit),
                                    minDays: companyHostingRules?.minDaily || 1,
                                }),
                            )}
                            currentHousingUnitId={housingUnit.id}
                        />
                    </div>
                </div>

                <SearchAvailability
                    maxGuests={housingUnit.maxGuests ?? undefined}
                    housingUnitId={housingUnit.id}
                    prices={generateCalendarPrices()}
                />
            </div>

            <ImageGallery
                title={selectedImages?.title ?? ''}
                images={selectedImages?.images ?? []}
                isOpen={!!selectedImages}
                onClose={() => setSelectedImages(null)}
            />
        </div>
    )
}
