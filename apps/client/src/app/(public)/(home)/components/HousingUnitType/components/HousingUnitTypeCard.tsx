'use client'

import { Button } from '@/components/atoms/Button'
import { ImageSlider } from '@/components/molecules/ImageSlider'
import type { HousingUnitTypeFacility } from '@booksuite/sdk'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface HousingUnitTypeCardProps {
    title: string
    description: string
    images: string[]
    facilities: HousingUnitTypeFacility[]
    onReserve?: () => void
    onDetails?: () => void
}

export const HousingUnitTypeCard: React.FC<HousingUnitTypeCardProps> = ({
    title,
    description,
    images,
    facilities,
    onReserve,
    onDetails,
}) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-1">
            <div className="aspect-[4/3] w-full">
                <ImageSlider
                    images={images}
                    aspectRatio="wide"
                    showPlayButton={false}
                />
            </div>

            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">{title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                    {facilities.map((facility) => (
                        <div
                            key={facility.id}
                            className="flex items-center gap-2 text-gray-700"
                        >
                            {facility.facility.icon && (
                                <Image
                                    src={facility.facility.icon}
                                    alt={facility.facility.name}
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                />
                            )}
                            <span className="text-sm">
                                {facility.facility.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={onReserve}
                        className="flex-1 bg-amber-800 text-white py-3 rounded-lg font-medium hover:bg-amber-900 transition-colors"
                    >
                        Reservar
                    </Button>
                    <Button
                        onClick={onDetails}
                        variant={'outline'}
                        className="flex-1 text-amber-800 gap-2 hover:text-amber-900 border-none py-3 rounded-lg font-medium hover:bg-grey-100 transition-colors "
                    >
                        Ver detalhes
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
