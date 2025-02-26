import { Button } from '@chakra-ui/react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <main>
            <h1>Olá, {session?.user?.name}</h1>

            <Button as={Link} href={'/nova-empresa'}>
                Adicionar Empresa
            </Button>
        </main>
    )
}
