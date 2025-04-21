import React from 'react'

type SlideIndicatorProps = {
    activeSlide: number
    totalSlides: number
    setActiveSlide: (index: number) => void
}

export const SlideIndicator: React.FC<SlideIndicatorProps> = ({
    activeSlide,
    totalSlides,
    setActiveSlide,
}) => {
    return (
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
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
    )
}
