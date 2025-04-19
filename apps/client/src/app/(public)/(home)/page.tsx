'use client'

import { About } from './components/About'
import { BannerFixed } from './components/BannerFixed'
import { ExtraServices } from './components/ExtraServices'
import { Others } from '@/components/organisms/Others'
import { HeaderHome } from './components/HeaderHome'
import { HousingUnitType } from './components/HousingUnitType'
import { ReceiveOurPromotions } from './components/ReceiveOurPromotions'

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <HeaderHome />
            <About />
            <HousingUnitType />
            <ExtraServices />
            <BannerFixed />
            <ReceiveOurPromotions />
            <Others />
        </div>
    )
}
