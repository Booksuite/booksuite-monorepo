'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { SlideIndicator } from '@/components/atoms/SlideIndicator'
import { SmartBannerSearch } from '@/components/molecules/SmartBannerSearch'
import { Navbar } from '@/components/templates/Navbar'

export const HeaderHome: React.FC = () => {
    const { company } = useCurrentCompanyStore()
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar
                textColor="text-white"
                textHoverColor="hover:text-white"
                selectedColorIsWhite
            />
            <div className="relative w-full h-screen">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <Image
                    src={
                        company?.bannerImage?.url ||
                        '/placeholder.svg?height=1080&width=1920'
                    }
                    alt="Banner"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl">
                        {company?.bannerTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-12">
                        {company?.bannerDescription}
                    </p>

                    <SmartBannerSearch />
                </div>

                <SlideIndicator
                    activeSlide={activeSlide}
                    setActiveSlide={setActiveSlide}
                    totalSlides={3}
                />
            </div>
        </div>
    )
}
