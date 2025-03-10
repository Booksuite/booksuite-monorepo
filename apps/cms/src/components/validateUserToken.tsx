'use client'

import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import axiosInstance from '@/common/services/axios/axiosInstance'

interface ValidateUserTokenProps {
    children: React.ReactNode
}

export function ValidateUserToken({ children }: ValidateUserTokenProps) {
    const pathname = usePathname()

    useEffect(() => {
        async function main() {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const res: any = await axiosInstance.get('/auth/me')
                if (!res.data?.success) {
                    signOut()
                }
            } catch {
                signOut()
            }
        }

        main()
    }, [pathname])

    return <>{children}</>
}
