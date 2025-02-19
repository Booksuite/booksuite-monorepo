import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import DashboadLoginForm from '@/components/templates/DashboadLoginForm'

export default async function Login() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/')
    }

    return (
        <div className="Login">
            <DashboadLoginForm />

            <Link
                className="text-center forgot-pass"
                href={'/forgot-my-password'}
            >
                Esqueceu a senha?
            </Link>
        </div>
    )
}
