'use client'

import { PageHeader } from '@/components/organisms/PageHeader'

import { ReservationPolicyForm } from './components/ReservationPolicyForm'

export default function ReservationPolicy() {
    return (
        <div className="Reservation_policy">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Reservas</PageHeader.Title>
            </PageHeader.Root>

            <ReservationPolicyForm />
        </div>
    )
}
