import { Stack, StackProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const PageHeaderRoot: React.FC<PropsWithChildren<StackProps>> = (
    props,
) => {
    return (
        <Stack direction="column" gap={2} mb={4} {...props}>
            {props.children}
        </Stack>
    )
}
