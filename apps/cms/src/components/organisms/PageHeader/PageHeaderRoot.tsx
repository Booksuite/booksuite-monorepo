import { Stack, StackProps } from '@mui/material'
import { PropsWithChildren } from 'react'

export const PageHeaderRoot: React.FC<PropsWithChildren<StackProps>> = (
    props,
) => {
    return (
        <Stack direction="column" gap={0.5} mb={2} {...props}>
            {props.children}
        </Stack>
    )
}
