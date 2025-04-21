'use client'

import { useGetHousingUnitTypeById } from '@booksuite/sdk'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/company'
import { SearchAvailability } from '@/components/molecules/SearchAvailability'
import { ImageGallery } from '@/components/organisms/ImageGallery'

export function HousingUnitDetails() {
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

    if (!housingUnit) {
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

            <SearchAvailability
                name={housingUnit.name}
                description={housingUnit.description ?? ''}
                maxGuests={housingUnit.maxGuests ?? undefined}
                onSearch={() => {}}
            />

            <ImageGallery
                title={selectedImages?.title ?? ''}
                images={selectedImages?.images ?? []}
                isOpen={!!selectedImages}
                onClose={() => setSelectedImages(null)}
            />
        </div>
    )
}
