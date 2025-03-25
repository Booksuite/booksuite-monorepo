'use client'

import { PageHeader } from '@/components/organisms/PageHeader'

import { TaxInformationForm } from './components/TaxInformationForm'

export default function TaxInformation() {
    return (
        <div className="tax_information">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Informações Fiscais</PageHeader.Title>

                <TaxInformationForm />
            </PageHeader.Root>
        </div>
    )
}
