export function ReservationSummary() {
    return (
        <div className="bg-white rounded-md border border-grey-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-grey-secondary">
                Resumo da reserva
            </h2>
            <div className="border-t border-grey-200 pt-4 -mx-6" />
            <div className="text-grey-secondary text-sm">
                <p>
                    Assim que adicionar acomodações e itens em seu carrinho,
                    você encontrará os valores da sua reserva aqui.
                </p>
            </div>
        </div>
    )
}
