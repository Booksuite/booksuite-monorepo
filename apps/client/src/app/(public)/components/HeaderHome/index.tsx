'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Button } from '@/components/atoms/Button'
import { Navbar } from '@/components/templates/Navbar'

export default function HeaderHome() {
    const { company } = useCurrentCompanyStore()
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />

            <div className="relative w-full h-screen">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <Image
                    src={
                        typeof company?.bannerImage === 'string'
                            ? company.bannerImage
                            : '/placeholder.svg?height=1080&width=1920'
                    }
                    alt="Banner"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl">
                        Privacidade, luxo e conforto em meio à natureza
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-12">
                        Hospede-se e viva esta experiência!
                    </p>

                    <div className="w-full max-w-4xl bg-white rounded-lg p-6 mt-8 flex justify-between">
                        <div className="mb-4 text-start items-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 ">
                                Busca inteligente:
                            </h3>
                            <h4>Datas · Experiências · Pacotes · Flexível</h4>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center w-1/2">
                            <Button
                                variant="default"
                                className="flex-1 bg-amber-800 hover:bg-amber-900 text-white py-6"
                            >
                                <Search className="mr-2 h-5 w-5" />
                                Pesquisar
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 border-amber-800 text-amber-800 hover:bg-amber-50 py-6"
                            >
                                Reservar
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
                    {[0, 1, 2].map((index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSlide(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${
                                activeSlide === index
                                    ? 'w-7 bg-white'
                                    : 'w-3 bg-white/50'
                            }`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
