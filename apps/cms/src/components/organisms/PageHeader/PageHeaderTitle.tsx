import { Heading } from '@chakra-ui/react'

import { PageHeaderTitleProps } from './types'

export const PageHeaderTitle: React.FC<PageHeaderTitleProps> = (props) => {
    return (
        <Heading as="h1" fontSize={'1.25rem'}>
            {props.children}
        </Heading>
    )
}
