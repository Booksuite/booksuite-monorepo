'use client'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { InputText } from '@/components/atoms/InputText'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/atoms/Avatar'

export default function Home() {
    const { company } = useCurrentCompanyStore()

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <Avatar className="w-32 h-32">
                <AvatarImage src={company?.logo ?? ''} alt="Logo da empresa" />
                <AvatarFallback>{company?.name?.[0] ?? 'B'}</AvatarFallback>
            </Avatar>
            <h1>{company?.name}</h1>
        </div>
    )
}
