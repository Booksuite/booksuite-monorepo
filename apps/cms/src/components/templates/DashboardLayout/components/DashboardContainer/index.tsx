import { Container } from '@mui/material'
import { PropsWithChildren } from 'react'

import { useDashboardLayoutStore } from '../../stores'

export const DashboardContainer: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const { fullWidth } = useDashboardLayoutStore()

    return (
        <Container
            disableGutters
            maxWidth={fullWidth ? false : 'lg'}
            fixed={!fullWidth}
        >
            {children}
        </Container>
    )
}
