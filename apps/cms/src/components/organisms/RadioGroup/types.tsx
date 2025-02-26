export interface RadioGroupItemsType {
    label: string
    checked?: boolean
}

export interface RadioGroupProps {
    items: Array<RadioGroupItemsType>
    name: string
    className?: string
    onChange?: (value: string[]) => void
}

export interface RadioGroupItemProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    name?: string
    labelFor?: string
    type?: string
    value?: string
    isChecked?: boolean
    onChange?: () => void
}
