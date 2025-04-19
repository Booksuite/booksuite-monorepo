import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Button } from '@/components/atoms/Button'
import Image from 'next/image'
import { useGetBannerById, useSearchBanners } from '@booksuite/sdk'
import { Container } from '@/components/organisms/Container'
import { SmartBannerSearch } from '@/components/molecules/SmartBannerSearch'

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
        <Container>
            <div className="relative w-full mx-20 mt-4 rounded-3xl overflow-hidden">
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
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 max-w-4xl">
                        {banner?.title || 'Reserve online'}
                    </h1>
                    <p className="text-base md:text-xl lg:text-xl text-white mb-6 md:mb-8">
                        {banner?.description ||
                            'Efetue sua busca e faça sua reserva'}
                    </p>

                    <SmartBannerSearch />
                </div>
            </div>
        </Container>
    )
}
