import { Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const PageHeaderRoot: React.FC<PropsWithChildren> = (props) => {
    return (
        <Flex direction="column" gap={2} {...props}>
            {props.children}
        </Flex>
    )
}
