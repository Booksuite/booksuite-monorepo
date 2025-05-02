'use client'

import { Others } from '@/components/organisms/Others'
import { ReceiveOurPromotions } from '@/components/organisms/ReceiveOurPromotions'
import { HousingUnitTypeCardTemplate } from '@/components/templates/HousingUnitTypeCardTemplate'
import { ServicesCardTemplate } from '@/components/templates/ServicesCardTemplate'

import { About } from './components/About'
import { BannerFixed } from './components/BannerFixed'
import { HeaderHome } from './components/HeaderHome'

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <HeaderHome />
            <About />
            <HousingUnitTypeCardTemplate />
            <ServicesCardTemplate />
            <BannerFixed />
            <ReceiveOurPromotions />
            <Others />
        </div>
    )
}
