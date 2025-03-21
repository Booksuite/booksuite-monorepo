export interface DatePickerProps {
    label?: string
    value?: string | Date | null
    onChange?: (date: Date) => void
    error?: string
    formControl?: {
        isInvalid?: boolean
    }
}
