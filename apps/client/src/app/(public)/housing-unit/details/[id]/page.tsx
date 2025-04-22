'use client'

import { Container } from '@/components/organisms/Container'
import { Others } from '@/components/organisms/Others'
import { ReceiveOurPromotions } from '@/components/organisms/ReceiveOurPromotions'
import { ExtraServices } from '@/components/templates/ExtraServices'

import { HousingUnitDetails } from './components/HousingUnitDetails'
import { OthersHousingUnit } from './components/OthersHousingUnit'

export default function HousingUnitPage() {
    return (
        <>
            <Container>
                <HousingUnitDetails />
                <ReceiveOurPromotions />
            </Container>

            <OthersHousingUnit />
            <ExtraServices />
            <Others />
        </>
    )
}
