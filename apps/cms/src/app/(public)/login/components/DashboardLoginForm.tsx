'use client'

import { Box, Button, Checkbox, Divider, FormControlLabel, Link, Tab, Tabs, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import type { LoginForm } from '../utils/types'
import { theme } from '@/common/theme'
import { Logo } from '@/components/atoms/Logo'
export default function DashboardLoginForm() {
    const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
    const [error, setError] = useState(false)
    const [tab, setTab] = useState(1) // 0: Criar conta, 1: Fazer login
    const [remember, setRemember] = useState(true)
    const router = useRouter()

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
            <Box sx={{ width: '100%', mx: 'auto', mt: 2, bgcolor: 'white', borderRadius: 3, p: 10, boxShadow: 2 }}>
                <Box display="flex" justifyContent="center" sx={{ mb: 5 }}>
                    <Logo.FullLogoDark />
                </Box>
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    variant="fullWidth"
                    sx={{ mb: 2, borderRadius: 2, bgcolor: '#f5f8fa', minHeight: 48 }}
                >
                    <Tab label="Criar conta" sx={{ fontWeight: 600, borderRadius: 2 }} />
                    <Tab label="Fazer login" sx={{ fontWeight: 600, borderRadius: 2 }} />
                </Tabs>
                <CustomTabPanel value={tab} index={1}>
                    <Typography variant="h6" sx={{ marginBlock: 5, fontWeight: 700, color: theme.palette.primary.main }}>
                        Fazer login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Digite seu e-mail"
                            value={form.email}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <TextField
                            label="Digite sua senha"
                            type="password"
                            value={form.password}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            InputProps={{ endAdornment: <Box sx={{ width: 24 }} /> }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <FormControlLabel
                                control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} />}
                                label={<Typography variant="body2">Permanecer conectado</Typography>}
                                sx={{ m: 0 }}
                            />
                            <Link href="#" underline="hover" sx={{ fontSize: 14, fontWeight: 600 }}>
                                Esqueci minha senha
                            </Link>
                        </Box>
                        {error && <Typography color="error" sx={{ mb: 2 }}>Login incorreto</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ bgcolor: '#F15A29', color: 'white', fontWeight: 700, borderRadius: 2, py: 1.5, mb: 2, '&:hover': { bgcolor: '#d94e22' } }}
                        >
                            Criar minha conta
                        </Button>
                    </form>
                    <Divider sx={{ my: 3 }}><Typography variant="body2">ou</Typography></Divider>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: 'white', color: '#222', borderColor: '#e0e0e0', mb: 2, p: 2 }}
                    >
                        Continuar com o Google
                    </Button>
                    <Typography variant="body2" align="center" sx={{ fontSize: 15, my: 5 }}>
                        Não possui uma conta?{' '}
                        <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>
                            Criar uma conta.
                        </Link>
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#888', mt: 2 }}>
                        * Ao criar minha conta estou de acordo com os <Link href="#" underline="hover">termos de uso</Link> e <Link href="#" underline="hover">política de privacidade</Link>.<br />
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#888', mt: 2 }}>
                        ** Ao preencher formulário, concordo em receber comunicações da Booksuite.
                    </Typography>
                </CustomTabPanel>

                <CustomTabPanel value={tab} index={0}>
                    <Typography variant="h6" sx={{ marginBlock: 5, fontWeight: 700, color: theme.palette.primary.main }}>
                        Criar conta e testar por 30 dias
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Digite seu e-mail"
                            value={form.email}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <TextField
                            label="Seu nome completo"
                            type="text"
                            value={form.password}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            InputProps={{ endAdornment: <Box sx={{ width: 24 }} /> }}
                        />
                        <TextField
                            label="Nome da empresa"
                            type="text"
                            value={form.password}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            InputProps={{ endAdornment: <Box sx={{ width: 24 }} /> }}
                        />
                        <TextField
                            label="Tipo de propriedade"
                            type="text"
                            value={form.password}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            InputProps={{ endAdornment: <Box sx={{ width: 24 }} /> }}
                        />
                        <TextField
                            label="Digite sua senha"
                            type="password"
                            value={form.password}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            InputProps={{ endAdornment: <Box sx={{ width: 24 }} /> }}
                        />
                        <TextField
                            label="Confirme sua senha"
                            type="password"
                            value={form.password}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            InputProps={{ endAdornment: <Box sx={{ width: 24 }} /> }}
                        />

                        {error && <Typography color="error" sx={{ mb: 2 }}>Login incorreto</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ bgcolor: '#F15A29', color: 'white', fontWeight: 700, borderRadius: 2, py: 1.5, mb: 2, '&:hover': { bgcolor: '#d94e22' } }}
                        >
                            Criar minha conta
                        </Button>
                    </form>

                    <Typography variant="body2" align="center" sx={{ fontSize: 15, my: 5 }}>
                        Não possui uma conta?{' '}
                        <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>
                            Criar uma conta.
                        </Link>
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#888', mt: 2 }}>
                        * Ao criar minha conta estou de acordo com os <Link href="#" underline="hover">termos de uso</Link> e <Link href="#" underline="hover">política de privacidade</Link>.<br />
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#888', mt: 2 }}>
                        ** Ao preencher formulário, concordo em receber comunicações da Booksuite.
                    </Typography>
                </CustomTabPanel>

            </Box>
        </FormContainer>
    )
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}

        >
            {value === index && <Box sx={{ p: 3, maxWidth: 600 }}>{children}</Box>}
        </div>
    );
}