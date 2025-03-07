'use client'

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { LoginForm } from './types'

export default function DashboardLoginForm() {
    const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true)

        const result = await signIn('credentials', {
            email: form.email,
            password: form.password,
            redirect: false,
        })

        if (result.error) {
            console.error(result.error)
            setError(true)
            setIsLoading(false)
            return
        }

        router.push('/')
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl mb={2}>
                <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    placeholder=" "
                />
                <FormLabel>Login</FormLabel>
            </FormControl>

            <FormControl mb={7}>
                <Input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    placeholder=" "
                />
                <FormLabel>Password</FormLabel>
            </FormControl>

            {error && <>Login incorreto</>}

            <Button mb={10} w={'350px'} isLoading={isLoading}>
                Entrar
            </Button>
        </form>
    )
}
