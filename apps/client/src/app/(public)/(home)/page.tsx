'use client'

import { About } from './components/About'
import { ExtraServices } from './components/ExtraServices'
import { HeaderHome } from './components/HeaderHome'
import { HousingUnitType } from './components/HousingUnitType'

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <HeaderHome />
            <About />
            <HousingUnitType />
            <ExtraServices />
        </div>
    )
}
