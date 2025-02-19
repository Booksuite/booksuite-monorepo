'use client'

import { Button, ButtonProps } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'

export function LogOutButton(props: ButtonProps) {
    return (
        <Button onClick={() => signOut()} {...props}>
            {props.children}
        </Button>
    )
}
