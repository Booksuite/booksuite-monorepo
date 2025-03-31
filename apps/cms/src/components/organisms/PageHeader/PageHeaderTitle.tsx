import { Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

export const PageHeaderTitle: React.FC<PropsWithChildren> = (props) => {
    return (
        <Typography variant="h6" fontWeight="bold">
            {props.children}
        </Typography>
    )
}
