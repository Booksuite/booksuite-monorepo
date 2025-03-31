import { Box, CircularProgress, Stack } from '@mui/material'
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
                <PageHeaderBackLink href={backButtonHref}>
                    {backLButtonLabel}
                </PageHeaderBackLink>
            )}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack>
                    <PageHeaderTitle>{title}</PageHeaderTitle>
                    {isLoading && <CircularProgress size={16} />}
                </Stack>
                {!!headerRight && <Box>{headerRight}</Box>}
            </Stack>
        </PageHeaderRoot>
    )
}

PageHeader.Root = PageHeaderRoot
PageHeader.BackLink = PageHeaderBackLink
PageHeader.Title = PageHeaderTitle
