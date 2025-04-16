import { Link, Stack } from '@mui/material'
import NextLink from 'next/link'

import { FormSection } from '@/components/atoms/FormSection'

import DashboardLoginForm from './components/DashboardLoginForm'

export default async function Login() {
    return (
        <div className="Login">
            <DashboardLoginForm />

            <Stack mt={4} alignItems={'center'}>
                <Link
                    component={NextLink}
                    href="/forgot-my-password"
                    display="block"
                    color="blue.500"
                    fontWeight="regular"
                    fontSize={18}
                >
                    Esqueceu a senha?
                </Link>
            </Stack>
        </div>
    )
}
