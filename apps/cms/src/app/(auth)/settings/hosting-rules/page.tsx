'use client'

import { PageHeader } from '@/components/organisms/PageHeader'

import { HostingRulesForm } from './components/HostingRulesForm'

export default function HostingRules() {
    return (
        <div className="hosting_rules">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Regras de Hospedagem</PageHeader.Title>
            </PageHeader.Root>

            <HostingRulesForm />
        </div>
    )
}
