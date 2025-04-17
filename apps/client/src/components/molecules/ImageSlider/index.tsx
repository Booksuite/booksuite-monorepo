'use client'

import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { SlideIndicator } from '@/components/atoms/SlideIndicator'

interface ImageSliderProps {
    images: string[]
    aspectRatio?: 'square' | 'video' | 'wide'
    showPlayButton?: boolean
    autoPlayInterval?: number
    roundedCorners?: {
        topLeft?: boolean
        topRight?: boolean
        bottomLeft?: boolean
        bottomRight?: boolean
    }
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
    images,
    aspectRatio = 'video',
    showPlayButton = true,
    autoPlayInterval = 5000,
    roundedCorners = {
        topLeft: true,
        topRight: true,
        bottomLeft: true,
        bottomRight: true,
    },
}) => {
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) =>
                prev === images.length - 1 ? 0 : prev + 1,
            )
        }, autoPlayInterval)

        return () => clearInterval(timer)
    }, [images.length, autoPlayInterval])

    const aspectRatioClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        wide: 'aspect-[4/3]',
    }

    const handlePrevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNextSlide = () => {
        setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const getRoundedClasses = () => {
        const corners = []
        if (roundedCorners.topLeft) corners.push('rounded-tl-2xl')
        if (roundedCorners.topRight) corners.push('rounded-tr-2xl')
        if (roundedCorners.bottomLeft) corners.push('rounded-bl-2xl')
        if (roundedCorners.bottomRight) corners.push('rounded-br-2xl')
        return corners.join(' ')
    }

    return (
        <div
            className={`relative ${aspectRatioClasses[aspectRatio]} w-full ${getRoundedClasses()} overflow-hidden group`}
        >
            <div className="absolute inset-0">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        fill
                        className={`
                object-cover transition-opacity duration-1000 ease-in-out
                ${index === activeSlide ? 'opacity-100' : 'opacity-0'}
            `}
                        priority={index === activeSlide}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

            <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next slide"
            >
                <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {showPlayButton && (
                <button
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/20 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Play video"
                >
                    <Play className="w-8 h-8 text-white" />
                </button>
            )}

            <SlideIndicator
                activeSlide={activeSlide}
                totalSlides={images.length}
                setActiveSlide={setActiveSlide}
            />
        </div>
    )
}
