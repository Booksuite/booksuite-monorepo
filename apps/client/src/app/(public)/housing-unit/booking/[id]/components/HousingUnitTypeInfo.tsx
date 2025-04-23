import {
    HousingUnitTypeFacility,
    useGetCompanyHostingRules,
} from '@booksuite/sdk'
import { ChevronRight, Gift, Images } from 'lucide-react'
import Image from 'next/image'

import {
    useCurrentCompanyId,
    useCurrentCompanyStore,
} from '@/common/contexts/company'
import { ImageSlider } from '@/components/molecules/ImageSlider'

interface HousingUnitTypeInfoProps {
    description: string
    images: string[]
    facilities: HousingUnitTypeFacility[]
    maxGuests: number
    maxAdults: number
    maxChildren: number
    onReserve?: () => void
    onDetails?: () => void
    onViewAllPhotos?: () => void
}

export const HousingUnitTypeInfo: React.FC<HousingUnitTypeInfoProps> = ({
    description,
    images,
    facilities,
    maxGuests,
    maxAdults,
    maxChildren,
    onViewAllPhotos,
}) => {
    const companyId = useCurrentCompanyId()

    const { company } = useCurrentCompanyStore()

    const { data: companyHostingRules } = useGetCompanyHostingRules({
        companyId,
    })

    return (
        <div className="w-full max-w-3xl">
            <div className="aspect-[4/3] w-full relative mb-6">
                <ImageSlider
                    images={images}
                    aspectRatio="wide"
                    showPlayButton={false}
                />
                <button
                    onClick={onViewAllPhotos}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-white/90 transition-colors"
                >
                    <Images className="w-4 h-4" />
                    <span className="text-sm">Ver fotos</span>
                </button>
            </div>

            <div className="space-y-4 mt-10">
                <h1 className="text-2xl font-regular text-gray-900">
                    Sobre esta acomodação
                </h1>
                {description && (
                    <div className="prose prose-sm max-w-none text-gray-600">
                        <p>{description}</p>
                    </div>
                )}
            </div>

            <div className="w-full h-[2px] mt-10 mb-10 bg-grey-200" />

            <div className="flex flex-col gap-8">
                {facilities.length > 0 && (
                    <>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-medium">
                                Principais Comodidades
                            </h2>
                            <div className="grid grid-cols-5 gap-4">
                                {facilities
                                    ?.filter((facility) => facility.isFeatured)
                                    .map((facility) => (
                                        <div
                                            key={facility.id}
                                            className="flex flex-col items-center gap-2 text-center border border-grey-200 rounded-lg p-2"
                                        >
                                            <div className="w-12 h-12 flex items-center justify-center">
                                                {facility.facility.icon ? (
                                                    <Image
                                                        src={
                                                            facility.facility
                                                                .icon
                                                        }
                                                        alt={
                                                            facility.facility
                                                                .name
                                                        }
                                                        className="w-8 h-8"
                                                    />
                                                ) : (
                                                    <Gift className="w-8 h-8" />
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
                                {facilities
                                    ?.filter((facility) => !facility.isFeatured)
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

                        <div className="w-full h-[2px] mt-10 mb-10 bg-grey-200" />
                    </>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-medium">Informações de hóspedes</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-md text-grey-primary">
                            • Máximo de hóspedes:
                        </span>
                        <span className="text-md text-grey-primary">
                            {maxGuests}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-md text-grey-primary">
                            • Máximo de Adultos:
                        </span>
                        <span className="text-md text-grey-primary">
                            {maxAdults}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-md text-grey-primary">
                            • Máximo de crianças:
                        </span>
                        <span className="text-md text-grey-primary">
                            {maxChildren}
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full h-[2px] mt-10 mb-10 bg-grey-200" />

            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-medium">Regras de hospedagem</h2>
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

            <div className="flex flex-row justify-between mt-4 items-center">
                <a className="text-grey-primary underline cursor-pointer">
                    Políticas de reservas, cancelamento e cookies
                </a>
                <ChevronRight className="w-6 h-6 text-grey-primary" />
            </div>

            <div className="w-full h-[2px] mt-10 mb-10 bg-grey-200" />

            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-medium">Sobre nós</h2>
                <p className="text-grey-secondary">{company?.description}</p>

                {company?.facilities && company?.facilities.length > 0 && (
                    <div className="flex flex-row justify-between mt-4 items-center ]">
                        <h3 className="text-lg font-medium">
                            Comodidades Inclusas
                        </h3>
                        {company?.facilities.map((facility) => (
                            <div key={facility.id}>
                                • {facility.facility.name}
                            </div>
                        ))}
                    </div>
                )}

                <div className="w-full h-[2px] mt-10 mb-10 bg-grey-200" />
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-medium text-grey-primary">
                    Dúvidas para reservar?
                </h2>
                <div className="flex flex-col gap-2 text-grey-secondary">
                    <h3 className="text-lg font-medium text-grey-primary">
                        Siga os passos:
                    </h3>
                    <div className="flex items-center gap-2">
                        <span>1.</span>
                        <span>Adicione esta acomodação em seu carrinho</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>2.</span>
                        <span>Escolha experiências e extras (opcional)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>3.</span>
                        <span>Preencha seus dados</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>4.</span>
                        <span>Efetue o pagamento online</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
