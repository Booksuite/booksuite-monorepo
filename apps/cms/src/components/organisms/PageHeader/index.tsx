import { Box, HStack, Spinner } from '@chakra-ui/react'
import { Route } from 'next'

import { PageHeaderBackLink } from './PageHeaderBackLink'
import { PageHeaderRoot } from './PageHeaderRoot'
import { PageHeaderTitle } from './PageHeaderTitle'

export interface PageHeaderProps {
    headerRight?: React.ReactNode
    backLButtonLabel?: string
    backButtonHref?: Route
    title: string
    isLoading?: boolean
}

export const PageHeader = ({
    title,
    backLButtonLabel,
    backButtonHref,
    headerRight,
    isLoading,
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
                <HStack>
                    <PageHeaderTitle>{title}</PageHeaderTitle>
                    {isLoading && <Spinner size="sm" />}
                </HStack>
                {!!headerRight && <Box>{headerRight}</Box>}
            </HStack>
        </PageHeaderRoot>
    )
}

PageHeader.Root = PageHeaderRoot
PageHeader.BackLink = PageHeaderBackLink
PageHeader.Title = PageHeaderTitle
