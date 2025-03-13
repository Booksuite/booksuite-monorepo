const BRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

export function formatCurrency(value: number): string {
    return BRL.format(value)
}
