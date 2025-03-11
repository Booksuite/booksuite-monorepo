import { Box, Flex } from '@chakra-ui/react'

import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { AuthProvider } from '../providers/AuthProvider'
interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <DashboardLayout>
            <AuthProvider>
                <Box width="100%" minHeight="100vh">
                    <Flex flexDirection="column" gridColumnStart={{ md: 2 }}>
                        <Box padding={{ base: '20px', md: '70px 100px' }}>
                            {children}
                        </Box>
                    </Flex>
                </Box>
            </AuthProvider>
        </DashboardLayout>
    )
}
