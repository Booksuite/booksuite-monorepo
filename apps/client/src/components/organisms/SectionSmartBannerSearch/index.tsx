import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

export interface SectionSmartBannerSearchProps {
    children: React.ReactNode
}

export function SectionSmartBannerSearch({
    children,
}: SectionSmartBannerSearchProps) {
    return (
        <div className="bg-primary-700 py-10 items-center flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white text-2xl mb-5">
                <Sparkles className="w-7 h-7" />
                <h1>Busca Inteligente</h1>
            </div>
            {children}
        </div>
    )
}
