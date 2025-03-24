'use client'

import { PageHeader } from '@/components/organisms/PageHeader'

import VisualIdentityForm from './components/VisualIdentityForm'

export default function VisualIdentity() {
    return (
        <div className="visual_identity">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Identidade Visual</PageHeader.Title>
            </PageHeader.Root>

            <VisualIdentityForm />
        </div>
    )
}
