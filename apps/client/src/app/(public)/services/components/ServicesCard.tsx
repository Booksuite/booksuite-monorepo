import { formatCurrency } from '@/common/utils/formatCurrency'
import { Button } from '@/components/atoms/Button'
import { ImageSlider } from '@/components/molecules/ImageSlider'
import { Flame, Images, Plus } from 'lucide-react'
import { useState } from 'react'
interface ServicesCardProps {
    title: string
    description: string
    images: string[]
    hasOffer: boolean
    price: number
    originalPrice?: number
    discount?: number
    onViewAllPhotos: () => void
}

export const ServicesCard: React.FC<ServicesCardProps> = ({
    title,
    description,
    images,
    hasOffer,
    price,
    originalPrice,
    discount = 10,
    onViewAllPhotos,
}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="bg-white flex flex-col rounded-3xl overflow-hidden border border-1 hover:shadow-md transition-shadow w-full">
            <div className="relative w-[500px]">
                <ImageSlider
                    images={images}
                    aspectRatio="wide"
                    showPlayButton={false}
                    roundedCorners={{
                        bottomRight: false,
                        topRight: true,
                        bottomLeft: false,
                        topLeft: true,
                    }}
                />
                <div className="absolute top-4 flex flex-row justify-between w-full">
                    {hasOffer && (
                        <div className="absolute left-4 border border-white/80 text-white/80 bg-white/80 backdrop-blur-sm px-1.5 py-1.5 rounded-md flex items-center">
                            <Flame className="w-5 h-5 text-systemColors-orange" />
                        </div>
                    )}
                    <button
                        onClick={onViewAllPhotos}
                        className="absolute right-4 text-grey-primary text-sm bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors px-1.5 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                        <Images className="w-5 h-5" />
                        <span>Fotos</span>
                    </button>
                </div>
            </div>
            <div className="p-6 flex flex-col gap-8">
                <div className="flex flex-col gap-2 max-w-[450px]">
                    <h3 className="text-lg font-medium text-grey-primary">
                        {title}
                    </h3>
                    <p className="text-sm min-h-[50px] text-grey-secondary">
                        {description.length > 100 && !isExpanded
                            ? `${description.substring(0, 100)}...`
                            : description}
                        {description.length > 100 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-primary-500 hover:text-primary-700 text-md font-medium ml-3"
                            >
                                {isExpanded ? 'Ver menos' : 'Ver mais'}
                            </button>
                        )}
                    </p>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-row justify-between flex-1 items-end">
                        <div className="flex flex-col items-baseline ">
                            <div className="flex items-center gap-2">
                                {originalPrice && (
                                    <span className="text-gray-400 line-through text-sm">
                                        {formatCurrency(originalPrice)}
                                    </span>
                                )}
                                {discount && discount > 0 && (
                                    <span className="bg-systemColors-orange text-white px-1.5 py-1 rounded-full text-sm font-medium">
                                        -{Math.round(discount)}%
                                    </span>
                                )}
                            </div>
                            <span className="text-lg font-bold text-gray-800">
                                {formatCurrency(price)}
                            </span>
                            <span className="text-gray-500 text-sm">
                                Por unidade
                            </span>
                        </div>
                        <Button className="hover:bg-primary-700 transition-colors gap-2 text-white w-[30%]">
                            <Plus className="w-4 h-4" />
                            <span>Adicionar</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
