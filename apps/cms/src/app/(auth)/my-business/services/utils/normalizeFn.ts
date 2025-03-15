import { ServiceCategory, ServiceCategoryInput } from '@booksuite/sdk'

export function normalizeServiceCategoryInput(
    category: ServiceCategory[],
): ServiceCategoryInput[] {
    return category.map((c) => ({
        id: c.id,
        name: c.name,    
    }))
}   
