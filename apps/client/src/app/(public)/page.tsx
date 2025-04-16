'use client'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import HeaderHome from './components/HeaderHome'

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <HeaderHome />
        </div>
    )
}
