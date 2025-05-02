'use client'

import type { HousingUnitTypeFacility } from '@booksuite/sdk'
import { ArrowRight, Images, Users } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/atoms/Button'
import { ImageSlider } from '@/components/molecules/ImageSlider'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

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
        <div className="bg-white flex flex-row rounded-xl overflow-hidden border border-1 hover:shadow-md transition-shadow w-[900px]">
            <div className="w-[50%] relative">
                <ImageSlider
                    images={images}
                    aspectRatio="square"
                    showPlayButton={false}
                    roundedCorners={{
                        bottomRight: false,
                        topRight: false,
                        bottomLeft: true,
                        topLeft: true,
                    }}
                />
                <div className="absolute top-3 left-3">
                    <div className="border border-white/80 text-white/80 bg-transparent backdrop-blur-sm px-2.5 py-2 rounded-md flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-medium">{maxGuests}</span>
                    </div>
                </div>
                <div className="absolute top-3 right-3">
                    <button
                        onClick={onViewAllPhotos}
                        className="bg-white/80 backdrop-blur-sm px-2.5 py-2 rounded-md flex items-center gap-1.5 hover:bg-white/90 transition-colors"
                    >
                        <Images className="w-4 h-4" />
                        <span className="text-xs">Fotos</span>
                    </button>
                </div>
            </div>

            <div className="w-[55%] p-5 flex flex-col">
                <h2 className="text-xl font-semibold text-grey-primary mb-2">
                    {title}
                </h2>
                <div className="relative flex-grow">
                    <p
                        className={`text-grey-secondary text-sm mb-3 ${isExpanded ? '' : 'line-clamp-3'}`}
                    >
                        {description}
                    </p>
                    {description.length > 100 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-primary-500 hover:text-primary-700 text-xs font-medium"
                        >
                            {isExpanded ? 'Ler menos' : 'Ler mais'}
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 mb-4">
                    {facilities
                        .filter((facility) => facility.isFeatured)
                        .map((facility) => (
                            <div
                                key={facility.id}
                                className="flex items-center gap-1.5 text-gray-secondary"
                            >
                                {facility.facility.icon ? (
                                    <DynamicIcon
                                        name={
                                            facility.facility.icon as IconName
                                        }
                                        className="w-4 h-4"
                                    />
                                ) : (
                                    <div className="w-4 h-4" />
                                )}
                                <span className="text-xs">
                                    {facility.facility.name}
                                </span>
                            </div>
                        ))}
                </div>

                <div className="flex gap-3 mt-auto">
                    <Button
                        onClick={onReserve}
                        className="flex-1 bg-primary-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                        Reservar
                    </Button>
                    <Button
                        onClick={onDetails}
                        variant="outline"
                        className="flex items-center justify-center flex-1 text-primary-500 gap-1.5 hover:text-primary-700 border-none py-2 rounded-lg text-sm font-medium hover:bg-grey-100 transition-colors"
                    >
                        Ver detalhes
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
