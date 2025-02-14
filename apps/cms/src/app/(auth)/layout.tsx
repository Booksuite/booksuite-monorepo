import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import SideBar from '@/components/header/SideBar'
import { TopBar } from '@/components/header/TopBar'
import { ValidateUserToken } from '@/components/validateUserToken'

interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="AuthLayout">
            <ValidateUserToken>
                <SideBar />

                <div className="AuthLayout__wrapper">
                    <TopBar />

                    <div className="AuthLayout__content">{children}</div>
                </div>
            </ValidateUserToken>
        </div>
    )
}
