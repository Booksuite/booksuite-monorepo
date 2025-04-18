import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Button } from '@/components/atoms/Button'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useGetBannerById, useSearchBanners } from '@booksuite/sdk'

export const BannerFixed = () => {
    const { company } = useCurrentCompanyStore()

    const { data: banners } = useSearchBanners(
        {
            companyId: company?.id ?? '',
        },
        {
            filter: {
                published: true,
                position: 'FEATURED_CONTENT',
            },
            pagination: {
                page: 1,
                itemsPerPage: 1,
            },
        },
        undefined,
        {
            query: {
                enabled: !!company?.id,
            },
        },
    )

    const bannerId = banners?.items?.[0]?.id
    const { data: banner } = useGetBannerById({
        id: bannerId ?? '',
        companyId: company?.id ?? '',
    })

    return (
        <div className="container mx-auto px-0 py-16 gap-20 items-center">
            <div className="relative aspect-[18/6] mx-4 mt-4 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <Image
                    src={
                        banner?.medias?.[0]?.media?.url ||
                        company?.bannerImage?.url ||
                        '/placeholder.svg?height=1080&width=1920'
                    }
                    alt="Banner"
                    fill
                    className="object-cover rounded-3xl"
                    priority
                />

                <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4 py-8 md:py-12">
                    <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-white mb-3 md:mb-4 max-w-4xl">
                        {banner?.title || 'Reserve online'}
                    </h1>
                    <p className="text-base md:text-xl lg:text-xl text-white mb-6 md:mb-8">
                        {banner?.description ||
                            'Efetue sua busca e faça sua reserva'}
                    </p>

                    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-start w-full md:w-auto">
                                <h3 className="text-base md:text-lg font-semibold text-grey-primary mb-1">
                                    Busca inteligente:
                                </h3>
                                <h4 className="text-sm md:text-base text-grey-secondary">
                                    Datas · Experiências · Pacotes · Flexível
                                </h4>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <Button
                                    variant="default"
                                    className="flex-1 md:flex-none bg-primary-500 hover:bg-primary-700 text-white px-6 py-3 min-w-[120px]"
                                >
                                    <Search className="mr-2 h-5 w-5" />
                                    Pesquisar
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 md:flex-none border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-6 py-3 min-w-[120px]"
                                >
                                    Reservar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
