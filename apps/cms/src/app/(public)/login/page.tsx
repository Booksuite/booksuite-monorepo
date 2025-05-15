import { Link, Stack } from '@mui/material'
import NextLink from 'next/link'

import DashboardLoginForm from './components/DashboardLoginForm'

export default async function Login() {
    return (
        <div className="Login">
            <DashboardLoginForm />

        </div>
    )
}
