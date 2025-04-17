'use client'

import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import type { LoginForm } from '../utils/types'

export default function DashboardLoginForm() {
    const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
    const [error, setError] = useState(false)

    const router = useRouter()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const result = await signIn('credentials', {
            email: form.email,
            password: form.password,
            redirect: false,
        })

        if (result?.error) {
            setError(true)
            return
        }

        router.push('/')
    }

    return (
        <FormContainer>
            <FormSection>
                <TextField
                    label="Email"
                    value={form.email}
                    fullWidth
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />
                <TextField
                    label="Password"
                    value={form.password}
                    fullWidth
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
            </FormSection>

            {error && <>Login incorreto</>}

            <Button>Entrar</Button>
        </FormContainer>
    )
}
