'use client'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Container } from '@/components/organisms/Container'
import { useGetServiceById } from '@booksuite/sdk'
import { useParams, useRouter } from 'next/navigation'
import { ServicesInfo } from './components/ServicesInfo'
import { ImageGallery } from '@/components/organisms/ImageGallery'
import { useState } from 'react'

export default function ServiceDetailsPage() {
    const { company } = useCurrentCompanyStore()
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const { data: service } = useGetServiceById(
        {
            companyId: company?.id ?? '',
            id,
        },
        {
            query: {
                enabled: !!company?.id && !!id,
            },
        },
    )

    const [isViewingAllPhotos, setIsViewingAllPhotos] = useState(false)

    return (
        <>
            <Container>
                <div className="w-full  mx-auto">
                    <div className="flex items-start w-full mb-2">
                        <button
                            onClick={() => router.back()}
                            className="text-primary-500 underline"
                        >
                            Voltar
                        </button>
                    </div>
                    <ServicesInfo
                        onViewAllPhotos={() => {
                            setIsViewingAllPhotos(true)
                        }}
                        description={service?.description ?? ''}
                        generalInfo={service?.notes ?? ''}
                        images={
                            service?.medias?.map((media) => media.media.url) ??
                            []
                        }
                    />
                </div>
            </Container>

            <ImageGallery
                title={service?.name ?? ''}
                images={service?.medias?.map((media) => media.media.url) ?? []}
                isOpen={isViewingAllPhotos}
                onClose={() => setIsViewingAllPhotos(false)}
            />
        </>
    )
}
