'use client'

import { Gift, MapPin } from 'lucide-react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Button } from '@/components/atoms/Button'
import { ImageSlider } from '@/components/molecules/ImageSlider'

export const About: React.FC = () => {
    const { company } = useCurrentCompanyStore()

    const bannerUrl = company?.bannerImage?.url || '/placeholder.svg'
    const images = Array(9).fill(bannerUrl)

    return (
        <div className="container mx-auto px-4 py-16 flex flex-col gap-20 items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">{company?.name}</h1>
                <div className="flex items-center text-primary-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>
                        {company?.city}, {company?.state} - {company?.country}
                    </span>
                </div>
            </div>

            <div className="flex w-screen">
                <div className="w-1/2 space-y-8 flex flex-col items-center px-16">
                    <div className="w-full">
                        <h2 className="text-2xl text-grey-primary font-bold mb-4">
                            Sobre nós
                        </h2>
                        <p className="text-grey-primary mb-4">
                            {company?.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-5 gap-4 w-full items-start">
                        {company?.facilities
                            ?.filter((facility) => facility.order !== null)
                            ?.sort((a, b) => (a.order || 0) - (b.order || 0))
                            ?.slice(0, 5)
                            ?.map((facility, index) => (
                                <div
                                    key={index}
                                    className="text-center flex flex-col items-center justify-center"
                                >
                                    <div className="text-3xl mb-2 flex items-center justify-center text-grey-primary">
                                        {facility.facility.icon || (
                                            <Gift className="w-8 h-8" />
                                        )}
                                    </div>
                                    <div className="text-sm font-medium text-grey-primary">
                                        {facility.facility.name}
                                    </div>
                                    <div className="text-sm text-grey-secondary">
                                        {facility.facility.category
                                            .toLowerCase()
                                            .split('_')
                                            .map(
                                                (word: string) =>
                                                    word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    word.slice(1),
                                            )
                                            .join(' ')}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="self-start">
                        <Button
                            variant="outline"
                            className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                        >
                            Sobre nós
                        </Button>
                    </div>
                </div>

                <div className="w-1/2 space-y-8 flex flex-col items-center px-16">
                    <ImageSlider
                        images={images}
                        aspectRatio="square"
                        showPlayButton={false}
                        autoPlayInterval={3000}
                    />
                </div>
            </div>
        </div>
    )
}
