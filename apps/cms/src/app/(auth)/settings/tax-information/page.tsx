'use client'

import { PageHeader } from '@/components/organisms/PageHeader'

export default function TaxInformation() {
    return (
        <div className="tax_information">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Informacoes Fiscais</PageHeader.Title>
            </PageHeader.Root>
        </div>
    )
}
