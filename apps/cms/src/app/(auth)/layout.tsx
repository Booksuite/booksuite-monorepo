import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { AuthProvider } from '../providers/AuthProvider'

interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <AuthProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </AuthProvider>
    )
}
