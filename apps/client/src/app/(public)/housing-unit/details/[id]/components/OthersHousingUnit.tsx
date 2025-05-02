import { useSearchHousingUnitTypes } from '@booksuite/sdk'
import { Images, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { formatCurrency } from '@/common/utils/formatCurrency'
import { Container } from '@/components/organisms/Container'
import { ImageGallery } from '@/components/organisms/ImageGallery'

export function OthersHousingUnit() {
    const { id: selectedHousingUnitTypeId } = useParams() as { id: string }
    const { company } = useCurrentCompanyStore()
    const { data: housingUnitTypes } = useSearchHousingUnitTypes(
        { companyId: company?.id ?? '' },
        {
            filter: {
                published: true,
            },
            pagination: {
                page: 1,
                itemsPerPage: 10,
            },
        },
        undefined,
        {
            query: {
                enabled: !!company?.id,
            },
        },
    )

    const [selectedUnit, setSelectedUnit] = useState<{
        title: string
        images: string[]
    } | null>(null)
    function onViewAllPhotos(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault()
        setSelectedUnit({
            title: housingUnitTypes?.items?.[0]?.name ?? '',
            images:
                housingUnitTypes?.items?.[0]?.medias?.map(
                    (media) => media.media.url,
                ) ?? [],
        })
    }
    return (
        <div className="bg-grey-100 py-16">
            <Container>
                <div className="flex flex-col items-center text-center mb-10">
                    <h2 className="text-3xl font-bold text-grey-primary mb-3">
                        Você também pode gostar
                    </h2>
                    <div className="text-grey-secondary text-lg">
                        <span>Confira nossas demais acomodações</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {housingUnitTypes?.items
                        ?.filter(
                            (unit) => unit.id !== selectedHousingUnitTypeId,
                        )
                        .map((unit) => (
                            <div key={unit.id}>
                                <div className="relative aspect-[18/10] min-h-[400px] max-w-[300px] rounded-lg overflow-hidden ">
                                    <Image
                                        src={unit.medias?.[0]?.media.url ?? ''}
                                        alt={unit.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-2 left-[85%] ">
                                        <button
                                            onClick={onViewAllPhotos}
                                            className="bg-white/80 backdrop-blur-sm px-2.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-white/90 transition-colors"
                                        >
                                            <Images className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="absolute w-full bottom-0 h-32 bg-gradient-to-t from-black/80 to-black/30">
                                        <div className="flex items-center gap-2 justify-between px-3 mt-5">
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                {unit.name}
                                            </h3>
                                            <div className="border border-white/80 text-white/80 bg-transparent backdrop-blur-sm px-2.5 py-2 rounded-md flex items-center gap-1.5">
                                                <Users className="w-4 h-4" />
                                                <span className="text-xs font-medium">
                                                    {unit.maxGuests}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between px-3">
                                            <div className="text-white mb-5">
                                                <p className="text-sm">
                                                    A partir de
                                                </p>
                                                <p className="font-semibold">
                                                    {formatCurrency(
                                                        unit.weekendPrice ?? 0,
                                                    )}{' '}
                                                    <span className="font-normal">
                                                        / diária
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <Link
                                                    href={`/housing-unit/details/${unit.id}`}
                                                >
                                                    <span className="text-white font-medium hover:text-primary-200 hover:underline transition-colors">
                                                        Ver Mais &gt;
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </Container>

            <ImageGallery
                title={selectedUnit?.title ?? ''}
                images={selectedUnit?.images ?? []}
                isOpen={!!selectedUnit}
                onClose={() => setSelectedUnit(null)}
            />
        </div>
    )
}
