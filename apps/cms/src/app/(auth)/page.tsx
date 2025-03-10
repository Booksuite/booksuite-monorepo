import { Button } from '@chakra-ui/react'
import Link from 'next/link'

import { CompaniesList } from './(components)/CompaniesList'

export default function Home() {
    return (
        <main>
            <Button as={Link} href={'/nova-empresa'}>
                Adicionar Empresa
            </Button>

            <CompaniesList />
        </main>
    )
}
