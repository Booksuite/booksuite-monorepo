'use client'

import { PageHeader } from '@/components/organisms/PageHeader'

export default function BusinessDescription() {
    return (
        <div className="business_description">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Descricao do Negocio</PageHeader.Title>
            </PageHeader.Root>
        </div>
    )
}
