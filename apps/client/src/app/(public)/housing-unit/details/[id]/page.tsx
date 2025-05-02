'use client'

import { Container } from '@/components/organisms/Container'
import { Others } from '@/components/organisms/Others'
import { ReceiveOurPromotions } from '@/components/organisms/ReceiveOurPromotions'
import { ServicesCardTemplate } from '@/components/templates/ServicesCardTemplate'

import { HousingUnitDetails } from './components/HousingUnitDetails'
import { OthersHousingUnit } from './components/OthersHousingUnit'

export default function HousingUnitDetailsPage() {
    return (
        <>
            <Container>
                <HousingUnitDetails />
                <ReceiveOurPromotions />
            </Container>

            <OthersHousingUnit />
            <ServicesCardTemplate />
            <Others />
        </>
    )
}
