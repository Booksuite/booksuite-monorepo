'use client'

import { PageHeader } from '@/components/organisms/PageHeader'

export default function Amenities() {
    return (
        <div className="amenities">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Comodidades</PageHeader.Title>
            </PageHeader.Root>
        </div>
    )
}
