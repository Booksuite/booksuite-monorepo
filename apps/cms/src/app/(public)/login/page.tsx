import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import LoginForm from '@/components/login/Form'

export default async function Login() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/')
    }

    return (
        <div className="Login">
            <LoginForm />

            <Link
                className="text-center forgot-pass"
                href={'/esqueci-minha-senha'}
            >
                Esqueceu a senha?
            </Link>
        </div>
    )
}
