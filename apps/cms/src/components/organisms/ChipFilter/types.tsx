export interface ChipItem {
    key: string
    label: string
}

export interface ChipFilterProps {
    items: ChipItem[]
    multiple?: boolean
    value: string[]
    onChange: (selectedKeys: string[]) => void
}
