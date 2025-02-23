export interface SimpleFilterItemsType {
    label: string
    checked?: boolean
}

export interface SimpleFilterProps {
    items: Array<SimpleFilterItemsType>
    name: string
    className?: string
    onChange?: Function
}

export interface SimpleFilterItemProps
    extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    name?: string
    labelFor?: string
    type?: string
    value?: string
}
