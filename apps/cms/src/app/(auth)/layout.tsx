import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { ValidateUserToken } from '@/components/validateUserToken'
import { Box, Flex } from '@chakra-ui/react'

interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    return (
        <DashboardLayout>
            <ValidateUserToken>
                <Box width="100%" minHeight="100vh">
                    <Flex flexDirection="column" gridColumnStart={{ md: 2 }}>
                        <Box padding={{ base: '20px', md: '70px 100px' }}>
                            {children}
                        </Box>
                    </Flex>
                </Box>
            </ValidateUserToken>
        </DashboardLayout>
    )
}
