'use client'

import { Plus } from 'lucide-react'

import { LinkButton } from '@/components/atoms/LinkButton'
import { PageHeader } from '@/components/organisms/PageHeader'

export default function SeasonRules() {
    return (
        <div className="season_rules">
            <PageHeader
                title="Regras de Temporada"
                backLButtonLabel="Meu Negócio"
                backButtonHref="/my-business"
                headerRight={
                    <LinkButton
                        href="/my-business/prices-and-periods/season-rules/create"
                        startIcon={<Plus size={16} />}
                    >
                        Adicionar
                    </LinkButton>
                }
            />
        </div>
    )
}
