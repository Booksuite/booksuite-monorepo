'use client'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { HeaderHome } from './components/HeaderHome'
import { About } from './components/About'

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <HeaderHome />
            <About />
        </div>
    )
}
