'use client'

import { PageHeader } from '@/components/organisms/PageHeader'

import { PrivacyPolicyForm } from './components/PrivacyPolicyForm'

export default function PrivacyPolicy() {
    return (
        <div className="privacy_policy">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Privacidade</PageHeader.Title>
            </PageHeader.Root>

            <PrivacyPolicyForm />
        </div>
    )
}
