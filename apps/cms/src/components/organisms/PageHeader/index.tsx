import { Box, HStack } from '@chakra-ui/react'
import { Route } from 'next'

import { PageHeaderBackLink } from './PageHeaderBackLink'
import { PageHeaderRoot } from './PageHeaderRoot'
import { PageHeaderTitle } from './PageHeaderTitle'

interface PageHeaderProps {
    headerRight?: React.ReactNode
    backLButtonLabel?: string
    backButtonHref?: Route
    title: string
}

export const PageHeader = ({
    title,
    backLButtonLabel,
    backButtonHref,
    headerRight,
}: PageHeaderProps) => {
    return (
        <PageHeaderRoot>
            {!!backLButtonLabel && (
                <Box>
                    <PageHeaderBackLink w="fit-content" href={backButtonHref}>
                        {backLButtonLabel}
                    </PageHeaderBackLink>
                </Box>
            )}
            <HStack align="center" justify="space-between">
                <PageHeaderTitle>{title}</PageHeaderTitle>
                {!!headerRight && <Box>{headerRight}</Box>}
            </HStack>
        </PageHeaderRoot>
    )
}

PageHeader.Root = PageHeaderRoot
PageHeader.BackLink = PageHeaderBackLink
PageHeader.Title = PageHeaderTitle
