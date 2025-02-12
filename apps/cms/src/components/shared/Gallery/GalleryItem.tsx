import { Icons } from '@/src/components/svgs/icons'
import { Image } from '@chakra-ui/react'

interface GalleryItemProps {
    src?: string
    alt?: string
    index?: number
    selected?: boolean
}

function GalleryItem(props: GalleryItemProps) {
    return (
        <div
            className={`Gallery__Item ${
                props.selected ? 'Gallery__Item--selected' : ''
            }`}
        >
            {props.selected && (
                <div className="Gallery__Item__mask">
                    <Icons.Drag />
                </div>
            )}

            <Image
                className="Gallery__Item__Image"
                src={props.src}
                alt={props.alt}
            />

            <div className="Gallery__Item__content">
                {props.index && (
                    <div className="Gallery__Item__title">
                        {props.index + 1}{' '}
                        {props.index === 0 && <span> - Capa</span>}
                    </div>
                )}

                {!props.selected && (
                    <button type="button" className="Gallery__Item__options">
                        <Icons.Options />
                    </button>
                )}
            </div>
        </div>
    )
}

export default GalleryItem
