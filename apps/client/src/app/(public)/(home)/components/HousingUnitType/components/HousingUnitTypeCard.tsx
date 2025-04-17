'use client'

import type { HousingUnitTypeFacility } from '@booksuite/sdk'
import { ArrowRight, Images, Users } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/atoms/Button'
import { ImageSlider } from '@/components/molecules/ImageSlider'

interface HousingUnitTypeCardProps {
    title: string
    description: string
    images: string[]
    facilities: HousingUnitTypeFacility[]
    maxGuests: number
    onReserve?: () => void
    onDetails?: () => void
    onViewAllPhotos?: () => void
}

export const HousingUnitTypeCard: React.FC<HousingUnitTypeCardProps> = ({
    title,
    description,
    images,
    facilities,
    maxGuests,
    onReserve,
    onDetails,
    onViewAllPhotos,
}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-1">
            <div className="aspect-[4/3] w-full relative">
                <ImageSlider
                    images={images}
                    aspectRatio="wide"
                    showPlayButton={false}
                    roundedCorners={{
                        bottomRight: false,
                        bottomLeft: false,
                    }}
                />
                <div className="absolute top-4 left-4 border border-white/80 text-white/80 bg-transparent backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{maxGuests}</span>
                </div>
                <button
                    onClick={onViewAllPhotos}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-white/90 transition-colors"
                >
                    <Images className="w-4 h-4" />
                    <span className="text-sm">Fotos</span>
                </button>
            </div>

            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">{title}</h2>
                <div className="relative">
                    <p
                        className={`text-gray-600 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}
                    >
                        {description}
                    </p>
                    {description.length > 100 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                            {isExpanded ? 'Ler menos' : 'Ler mais'}
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-4 mt-6 mb-6">
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
                        className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                        Reservar
                    </Button>
                    <Button
                        onClick={onDetails}
                        variant={'outline'}
                        className="flex-1 text-primary-600 gap-2 hover:text-primary-700 border-none py-3 rounded-lg font-medium hover:bg-grey-100 transition-colors "
                    >
                        Ver detalhes
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
