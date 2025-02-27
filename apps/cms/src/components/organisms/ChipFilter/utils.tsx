import { useState } from 'react'

export const [selectedItems, setSelectedItems] = useState<string[]>([])

export const toggleSelection = (key: string) => {
    setSelectedItems((prev) =>
        prev.includes(key)
            ? prev.filter((item) => item !== key)
            : [...prev, key],
    )
}
