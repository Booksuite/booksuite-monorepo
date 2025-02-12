'use client'

import React from 'react'

import { useClient } from '@/hooks/useClient'
import { useCompanyContext } from '@/src/app/providers/companyProvider'

interface LayoutConfiguracoesProps {
    children: React.ReactNode
}

export default function LayoutConfiguracoes(props: LayoutConfiguracoesProps) {
    const { company, isLoading } = useCompanyContext()

    const { isClient } = useClient()

    if (!isClient || isLoading) {
        return 'Carregando dados...'
    }

    if (!company) {
        return 'Selecione uma companhia'
    }

    return <>{props.children}</>
}
