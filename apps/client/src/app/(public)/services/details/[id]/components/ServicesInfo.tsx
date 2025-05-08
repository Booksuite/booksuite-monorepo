import { ChevronRight, Images } from 'lucide-react'

import { ImageSlider } from '@/components/molecules/ImageSlider'

interface ServicesInfoProps {
    description: string
    images: string[]
    onViewAllPhotos?: () => void
    generalInfo: string
}

export const ServicesInfo: React.FC<ServicesInfoProps> = ({
    description,
    images,
    onViewAllPhotos,
    generalInfo,
}) => {
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
                <h1 className="text-xl font-regular text-grey-primary">
                    Sobre este item
                </h1>
                {description && (
                    <div className="prose prose-sm max-w-none text-grey-secondary">
                        <p>{description}</p>
                    </div>
                )}
            </div>

            <div className="w-full h-[2px] mt-10 mb-10 bg-grey-200" />

            {generalInfo && (
                <div className="space-y-4 mt-10">
                    <h1 className="text-lg font-regular text-grey-primary">
                        Informações gerais
                    </h1>

                    <ul className="pl-5 text-grey-secondary space-y-1 text-sm">
                        {generalInfo
                            .split(/(?<=[.;?!])\s+|(?:\r?\n)+/)
                            .map((item, index) => (
                                <li key={index} className="list-none">
                                    {item}
                                </li>
                            ))}
                    </ul>
                </div>
            )}

            <div className="flex flex-row justify-between mt-4 items-center">
                <a className="text-grey-primary underline cursor-pointer">
                    Políticas de reservas, cancelamento e cookies
                </a>
                <ChevronRight className="w-6 h-6 text-grey-primary" />
            </div>
        </div>
    )
}
