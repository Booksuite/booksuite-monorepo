export interface DateProps {
    name?: string
    defaultValue?: string
}

export interface DateRangeBoxProps {
    label: string
    startDateProps?: any
    endDateProps?: any
    asSingleDate?: boolean
    singleDateValue?: string
    onChange?: (
        dates: { startDate: Date | null; endDate: Date | null } | Date | null,
    ) => void
}
