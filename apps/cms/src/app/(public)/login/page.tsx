import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import { FormSection } from '@/components/atoms/FormSection'

import DashboardLoginForm from './components/DashboardLoginForm'

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
