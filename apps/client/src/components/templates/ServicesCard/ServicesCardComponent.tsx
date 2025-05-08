'use client'

import { Flame, Images, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { formatCurrency } from '@/common/utils/formatCurrency'
import { Button } from '@/components/atoms/Button'
import { ImageSlider } from '@/components/molecules/ImageSlider'

interface ServicesCardComponentProps {
    title: string
    description: string
    images: string[]
    price: number
    originalPrice?: number
    hasOffer?: boolean
    discount?: number
    onQuantityChange?: (quantity: number) => void
    onViewAllPhotos?: () => void
}

export const ServicesCardComponent: React.FC<ServicesCardComponentProps> = ({
    title,
    description,
    images,
    price,
    originalPrice,
    hasOffer,
    discount,
    onQuantityChange,
    onViewAllPhotos,
}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [quantity, setQuantity] = useState(0)

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 0) {
            setQuantity(newQuantity)
            onQuantityChange?.(newQuantity)
        }
    }

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
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
                {hasOffer && (
                    <div className="absolute top-4 left-4 border border-white/80 text-white/80 bg-white/80 backdrop-blur-sm px-1.5 py-1.5 rounded-md flex items-center">
                        <Flame className="w-5 h-5 text-systemColors-orange" />
                    </div>
                )}
                <button
                    onClick={onViewAllPhotos}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-2 rounded-md flex items-center hover:bg-white/90 transition-colors"
                >
                    <Images className="w-4 h-4" />
                </button>
            </div>

            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {title}
                </h2>
                <div className="relative mb-6">
                    <p
                        className={`text-gray-600 text-md ${isExpanded ? '' : 'line-clamp-2'}`}
                    >
                        {description}
                    </p>
                    {description.length > 100 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-primary-500 hover:text-primary-700 text-sm font-medium mt-2"
                        >
                            {isExpanded ? 'Ler menos' : 'Ler mais'}
                        </button>
                    )}
                </div>

                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-col items-baseline gap-2">
                            <div className="flex items-center gap-2">
                                {originalPrice && originalPrice > price && (
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
                        </div>
                        <span className="text-gray-500 text-sm">
                            Por unidade
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mt-10 ">
                        {quantity === 0 ? (
                            <Button
                                onClick={() => handleQuantityChange(1)}
                                className="w-26 gap-1 h-12 bg-primary-500 text-sm hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Adicionar
                            </Button>
                        ) : (
                            <div className="flex items-center rounded-lg w-26">
                                <button
                                    onClick={() =>
                                        handleQuantityChange(quantity - 1)
                                    }
                                    className="py-4 px-3 bg-primary-500 hover:bg-primary-600 cursor-pointer transition-colors rounded-l-lg"
                                >
                                    <Minus className="w-4 h-4 text-white" />
                                </button>
                                <span className="w-12 text-center font-semibold text-sm text-primary-500">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        handleQuantityChange(quantity + 1)
                                    }
                                    className="py-4 px-3 bg-primary-500 hover:bg-primary-600 cursor-pointer transition-colors rounded-r-lg"
                                >
                                    <Plus className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
