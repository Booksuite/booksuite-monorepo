'use client'

import { Others } from '@/components/organisms/Others'
import { ReceiveOurPromotions } from '@/components/organisms/ReceiveOurPromotions'
import { ExtraServices } from '@/components/templates/ExtraServices'

import { About } from './components/About'
import { BannerFixed } from './components/BannerFixed'
import { HeaderHome } from './components/HeaderHome'
import { HousingUnitType } from './components/HousingUnitType'

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
