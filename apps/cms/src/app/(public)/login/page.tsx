import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import DashboardLoginForm from '@/components/templates/DashboardLoginForm'

export default async function Login() {
    return (
        <div className="Login">
            <DashboardLoginForm />

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
