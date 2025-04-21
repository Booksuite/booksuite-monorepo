'use client'

import { useGetBannerById, useSearchBanners } from '@booksuite/sdk'
import Image from 'next/image'

import { useEffect } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { SmartBannerSearch } from '@/components/molecules/SmartBannerSearch'
import { usePageLayoutStore } from '@/components/templates/PageLayout/store'

export const HeaderHome: React.FC = () => {
    const { setDarkMode } = usePageLayoutStore()

    useEffect(() => {
        setDarkMode(true)
        return () => {
            setDarkMode(false)
        }
    }, [setDarkMode])

    const { company } = useCurrentCompanyStore()

    const { data: banners } = useSearchBanners(
        {
            companyId: company?.id ?? '',
        },
        {
            filter: {
                published: true,
                position: 'HOME_TOP',
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
        <div className="relative -mt-24 -z-10 min-h-screen flex flex-col">
            <div className="relative w-full h-screen">
                <div className="absolute inset-0 bg-grey-primary/50 z-10" />
                <Image
                    src={
                        banner?.medias?.[0]?.media?.url ||
                        company?.bannerImage?.url ||
                        '/placeholder.svg?height=1080&width=1920'
                    }
                    alt="Banner"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl">
                        {banner?.title || company?.bannerTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-12">
                        {banner?.description || company?.bannerDescription}
                    </p>

                    <SmartBannerSearch />
                </div>
            </div>
        </div>
    )
}
