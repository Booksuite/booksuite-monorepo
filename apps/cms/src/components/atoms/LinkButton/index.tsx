import { Button, ButtonProps } from '@mui/material'
import { Route } from 'next'
import Link from 'next/link'

interface LinkButtonProps extends ButtonProps {
    href: Route
}

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
    return (
        <Button component={Link} {...props}>
            Adicionar
        </Button>
    )
}
