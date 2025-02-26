import { getServerSession } from 'next-auth'
import NextLink from 'next/link'
import { redirect } from 'next/navigation'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import DashboadLoginForm from '@/components/templates/DashboadLoginForm'
import { Link } from '@chakra-ui/react'

export default async function Login() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/')
    }

    return (
        <div className="Login">
            <DashboadLoginForm />

            <Link
                as={NextLink}
                href="/forgot-my-password"
                display="block"
                color="blue.500"
                fontWeight="regular"
                fontSize={18}
            >
                Esqueceu a senha?
            </Link>
        </div>
    )
}
