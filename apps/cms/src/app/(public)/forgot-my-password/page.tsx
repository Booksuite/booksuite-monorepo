'use client'

import { Button, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'

export default function ForgotMyPassword() {
    const [email, setEmail] = useState('')

    return (
        <FormContainer>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                Digite seu e-mail que enviaremos um link para a recuperação de
                sua senha.
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
                <Button type="submit" variant="contained" sx={{ mb: 3, mt: 4 }}>
                    Enviar
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
