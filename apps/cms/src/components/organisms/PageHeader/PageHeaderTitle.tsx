import { Heading } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const PageHeaderTitle: React.FC<PropsWithChildren> = (props) => {
    return (
        <Heading as="h1" fontSize={24} fontWeight="bold" mb={0}>
            {props.children}
        </Heading>
    )
}
