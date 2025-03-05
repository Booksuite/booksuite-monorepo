'use client'

import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
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
