import { PageHeaderBackLink } from './PageHeaderBackLink'
import { PageHeaderRoot } from './PageHeaderRoot'
import { PageHeaderTitle } from './PageHeaderTitle'

interface PageHeaderProps {
    backLButtonLabel?: string
    backButtonHref?: string
    title: string
}

export const PageHeader = ({
    title,
    backLButtonLabel,
    backButtonHref,
}: PageHeaderProps) => {
    return (
        <PageHeaderRoot>
            <PageHeaderBackLink href={backButtonHref}>
                {backLButtonLabel}
            </PageHeaderBackLink>

            <PageHeaderTitle>{title}</PageHeaderTitle>
        </PageHeaderRoot>
    )
}

PageHeader.Root = PageHeaderRoot
PageHeader.BackLink = PageHeaderBackLink
PageHeader.Title = PageHeaderTitle
