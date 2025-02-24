import { Stack } from '@chakra-ui/react'
import { ListRootProps } from './types'

const ListRoot: React.FC<ListRootProps> = (props) => {
    return <Stack spacing={'0.625rem'}>{props.children}</Stack>
}

export default ListRoot
