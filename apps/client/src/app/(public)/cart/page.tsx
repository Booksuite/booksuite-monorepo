import { Container } from '@/components/organisms/Container'

import { Cart } from './components/Cart'
import { ReservationSummary } from './components/ReservationSummary'

export default function CartPage() {
    return (
        <div className="bg-grey-100 min-h-screen">
            <Container>
                <div className="py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Cart />
                        </div>
                        <div>
                            <ReservationSummary />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
