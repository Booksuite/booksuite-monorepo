import { Button } from '@chakra-ui/react'
import Link from 'next/link'

import { PageHeader } from '@/components/organisms/PageHeader'

export default function Mapa() {
    return (
        <div className="pageMapa">
            <PageHeader.Root>
                <PageHeader.BackLink href="/">Início</PageHeader.BackLink>

                <PageHeader.Title>Nova Reserva</PageHeader.Title>
            </PageHeader.Root>

            <Link href="/mapa/nova-reserva">
                <Button>Nova Reserva</Button>
            </Link>
        </div>
    )
}
