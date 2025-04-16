import { Stack } from '@mui/material'

interface InternalMenuRootProps {
    children: React.ReactNode
    className?: string
}

export function InternalMenuRoot({
    children,
    ...props
}: InternalMenuRootProps) {
    return (
        <nav className={`InternalMenu ${props.className}`}>
            <Stack direction="column" spacing={3}>
                {children}
            </Stack>
        </nav>
    )
}
