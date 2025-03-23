'use client'

import { PageHeader } from '@/components/organisms/PageHeader'

import { CancellationPolicyTemplatesForm } from './components/CancellationPolicyTemplateForm'

export default function CancellationPolicyTemplates() {
    return (
        <div className="cancellation_policy">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings/cancellation-policy">
                    Política de Cancelamento
                </PageHeader.BackLink>

                <PageHeader.Title>
                    Modelos de Políticas de Cancelamento e Troca
                </PageHeader.Title>
            </PageHeader.Root>

            <CancellationPolicyTemplatesForm />
        </div>
    )
}
