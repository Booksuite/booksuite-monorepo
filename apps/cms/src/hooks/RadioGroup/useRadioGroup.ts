import { RadioGroupItemsType } from '@/components/organisms/RadioGroup/types'
import { useState } from 'react'

export function useRadioGroup(
    items: RadioGroupItemsType[],
    onChange?: (values: string[]) => void,
) {
    const [selectedValues, setSelectedValues] = useState<string[]>(
        items.filter((el) => el.checked ?? false).map((el) => el.label),
    )

    function handleChange(value: string) {
        setSelectedValues((prevValues) => {
            const newValues = prevValues.includes(value)
                ? prevValues.filter((val) => val !== value)
                : [...prevValues, value]

            onChange?.(newValues)

            return newValues
        })
    }

    return { selectedValues, handleChange }
}
