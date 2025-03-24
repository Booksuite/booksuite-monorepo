export function getGalleryDescription(
    minItems: number | undefined,
    maxItems: number | undefined,
) {
    if (minItems && maxItems) {
        return `Selecione entre ${minItems} e ${maxItems} mídias`
    }

    if (minItems) {
        return `Selecione pelo menos ${minItems} mídias`
    }

    if (maxItems) {
        return `Selecione até ${maxItems} mídias`
    }

    return 'Selecione mídias'
}
