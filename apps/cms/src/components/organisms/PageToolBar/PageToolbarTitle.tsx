import * as React from 'react'

export interface PageToolbarTitleProps {
    children: React.ReactNode
}

export function PageToolbarTitle(props: PageToolbarTitleProps) {
    return <h1 className="PageToolbarTitle">{props.children}</h1>
}
