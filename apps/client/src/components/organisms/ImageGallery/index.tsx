'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'

interface ImageGalleryProps {
    title: string
    images: string[]
    isOpen: boolean
    onClose: () => void
}

export const ImageGallery = ({
    title,
    images,
    isOpen,
    onClose,
}: ImageGalleryProps) => {
    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <div
            className={`
                fixed inset-0 z-50 transition-all duration-500 ease-in-out
                ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}
            `}
        >
            <div
                className={`
                    fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500
                    ${isOpen ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={handleClose}
            />
            <div
                className={`
                    fixed inset-0 z-50 transform transition-all duration-300 ease-out
                    ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
                `}
            >
                <div
                    className="min-h-screen bg-white overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white/80 backdrop-blur-sm z-10 py-4">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                {title}
                            </h2>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
                            {images.map((image, index) => (
                                <div
                                    key={`${image}-${index}`}
                                    className="relative aspect-[4/3] rounded-md overflow-hidden shadow-md"
                                >
                                    <Image
                                        src={image}
                                        alt={`${title} - Imagem ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                        priority={index < 6}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
