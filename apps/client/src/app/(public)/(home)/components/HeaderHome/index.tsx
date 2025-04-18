'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Button } from '@/components/atoms/Button'
import { SlideIndicator } from '@/components/atoms/SlideIndicator'
import { Navbar } from '@/components/templates/Navbar'

export const HeaderHome: React.FC = () => {
    const { company } = useCurrentCompanyStore()
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />

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

                    <div className="w-full max-w-4xl bg-white rounded-lg p-6 mt-8 flex justify-between">
                        <div className="mb-4 text-start items-center">
                            <h3 className="text-lg font-semibold text-grey-primary mb-2 ">
                                Busca inteligente:
                            </h3>
                            <h4 className="text-grey-secondary">
                                Datas · Experiências · Pacotes · Flexível
                            </h4>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center w-1/2">
                            <Button
                                variant="default"
                                className="flex-1 bg-primary-500 hover:bg-primary-700 text-white py-6"
                            >
                                <Search className="mr-2 h-5 w-5" />
                                Pesquisar
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white py-6"
                            >
                                Reservar
                            </Button>
                        </div>
                    </div>
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
