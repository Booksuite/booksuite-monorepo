import { Stack } from '@chakra-ui/react'
import { ListRootProps } from './types'

export function ListRoot(props: ListRootProps) {
    return (
        <Stack spacing={'0.625rem'} className="List">
            {props.children}
        </Stack>
    )
}
