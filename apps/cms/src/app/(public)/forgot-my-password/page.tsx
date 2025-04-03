'use client'

import { Button, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'

export default function ForgotMyPassword() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
        } catch (error) {}

        return (
            <FormContainer onSubmit={handleSubmit}>
                <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                    Digite seu e-mail que enviaremos um link para a recuperação
                    de sua senha.
                </Typography>

                <FormSection>
                    <TextField
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormSection>

                <FormSection>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mb: 3, mt: 4 }}
                    >
                        {isLoading ? 'Enviando...' : 'Enviar'}
                    </Button>
                </FormSection>

                <Link
                    component={NextLink}
                    href="/login"
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        fontWeight: 600,
                    }}
                >
                    Voltar para o login
                </Link>
            </FormContainer>
        )
    }
}
