import { DialogProps } from '@mui/material'

export interface TabFilterItem {
    label: string
    value: string
}

export interface SelectBoxModalProps<T extends { name: string; id: string }>
    extends Omit<DialogProps, 'children' | 'onSelect'> {
    onSelect: (items: T[]) => void
    initialSelectedItems?: T[]
    items: T[]
    tabFilter?: TabFilterItem[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterGetter?: (item: T) => any
    querySearchGetter?: (item: T) => string
    keyGetter?: (item: T) => string
    renderItemContent?: (item: T, selected: boolean) => React.ReactNode
    title?: string
    description?: string
    selectButtonText?: string
    cancelButtonText?: string
}

export interface SelectBoxProps<T extends { name: string; id: string }>
    extends Omit<SelectBoxModalProps<T>, 'isOpen' | 'onClose'> {
    openModalButtonText?: string
}
