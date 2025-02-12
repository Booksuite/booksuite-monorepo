import Logo from '@/src/components/svgs/Logo'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Custom404() {
    return (
        <div className="PublicLayout">
            <div className="container">
                <Logo className="logo" />

                <h1 className="text-white">Página não encontrada</h1>

                <Button as={Link} href={'/'}>
                    Voltar
                </Button>
            </div>
        </div>
    )
}
