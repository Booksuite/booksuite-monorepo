'use client'

import axiosInstance from '@/services/axios/axiosInstance'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

interface ValidateUserTokenProps {
    children: React.ReactNode
}

export function ValidateUserToken({ children }: ValidateUserTokenProps) {
    const pathname = usePathname()

    useEffect(() => {
        async function main() {
            try {
                const res: any = await axiosInstance.get('/auth/me')
                if (!res.data?.success) {
                    signOut()
                }
            } catch (err) {
                signOut()
            }
        }

        main()
    }, [pathname])

    return <>{children}</>
}
