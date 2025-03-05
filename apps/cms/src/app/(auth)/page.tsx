import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export default async function Home() {

    return (
        <main>
            <h1>Olá, Seja bem Vindo</h1>

            <Button as={Link} href={'/nova-empresa'}>
                Adicionar Empresa
            </Button>
        </main>
    )
}
