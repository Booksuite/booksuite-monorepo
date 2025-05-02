'use client'

import { Others } from '@/components/organisms/Others'
import { ReceiveOurPromotions } from '@/components/organisms/ReceiveOurPromotions'
import { HousingUnitTypeCard } from '@/components/templates/HousingUnitTypeCard'
import { ServicesCard } from '@/components/templates/ServicesCard'

import { About } from './components/About'
import { BannerFixed } from './components/BannerFixed'
import { HeaderHome } from './components/HeaderHome'

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <HeaderHome />
            <About />
            <HousingUnitTypeCard />
            <ServicesCard />
            <BannerFixed />
            <ReceiveOurPromotions />
            <Others />
        </div>
    )
}
