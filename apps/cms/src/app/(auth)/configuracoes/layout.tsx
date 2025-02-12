'use client'

import React from 'react'

import { useCompanyContext } from '@/app/providers/companyProvider'
import { useClient } from '@/hooks/useClient'

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
