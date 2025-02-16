import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import DashboardLogin from '@/components/templates/DashboardLogin'

export default async function Login() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/')
    }

    return (
        <div className="Login">
            <DashboardLogin />

            <Link
                className="text-center forgot-pass"
                href={'/esqueci-minha-senha'}
            >
                Esqueceu a senha?
            </Link>
        </div>
    )
}
