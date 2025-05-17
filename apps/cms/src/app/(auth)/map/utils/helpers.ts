import {
    BillingType,
    RateOptionFull,
    ReservationAgeGroupInput,
    ReservationService,
    Service,
    ServiceFull,
} from '@booksuite/sdk'
import moment from 'moment'

export function getNewReservationServicesArray(
    currentServices: ReservationService[],
    service: ServiceFull,
    newQuantity: number,
    totalAdults: number,
    totalStay: number,
) {
    const updatedServices = [...(currentServices || [])]

    const existingServiceIndex = updatedServices.findIndex(
        (s) => s.service.id === service.id,
    )

    if (newQuantity > 0) {
        if (
            existingServiceIndex !== -1 &&
            updatedServices[existingServiceIndex]
        ) {
            updatedServices[existingServiceIndex].quantity = newQuantity
            updatedServices[existingServiceIndex].totalPrice =
                calculateServicePrice(
                    service,
                    newQuantity,
                    totalAdults,
                    totalStay,
                )
        } else {
            updatedServices.push({
                id: service.id,
                service: service,
                quantity: newQuantity,
                totalPrice: calculateServicePrice(
                    service,
                    newQuantity,
                    totalAdults,
                    totalStay,
                ),
            })
        }
    } else {
        if (existingServiceIndex !== -1)
            updatedServices.splice(existingServiceIndex, 1)
    }

    return updatedServices
}

export function calculateTotalStay(start: string, end: string): number {
    const startDate = moment.utc(start)
    const endDate = moment.utc(end)
    return endDate.diff(startDate, 'day') - 1
}

export function calculateRateOptionPrice(
    rateOption: RateOptionFull,
    adults: number,
    ageGroups: ReservationAgeGroupInput[],
    totalStay: number,
): number {
    const adultPrice = calculateBillingType(
        rateOption.additionalAdultPrice,
        rateOption.billingType,
        adults,
        totalStay,
        1,
    )

    const childrenPrice =
        ageGroups.reduce((acc, group) => {
            if (!rateOption) return acc

            const ageGroupPrice = rateOption.ageGroupPrices.find(
                (price) => price.ageGroup.id === group.ageGroupId,
            )

            if (!ageGroupPrice) return acc

            return (
                acc +
                calculateBillingType(
                    ageGroupPrice.price,
                    rateOption.billingType,
                    1,
                    totalStay,
                    group.quantity,
                )
            )
        }, 0) ?? 0

    return adultPrice + childrenPrice
}

export function calculateServicePrice(
    service: Service,
    quantity: number,
    totalAdults: number,
    totalStay: number,
): number {
    return calculateBillingType(
        service.price,
        service.billingType,
        quantity,
        totalStay,
        totalAdults,
    )
}

export function shouldDisplayQuantity(billingType: BillingType): boolean {
    if (['PER_HOUSING_UNIT', 'PER_GUEST_DAILY'].includes(billingType)) {
        return true
    }

    return false
}

function calculateBillingType(
    basePrice: number,
    billingType: BillingType,
    quantity: number,
    totalStay: number,
    totalGuests: number,
) {
    switch (billingType) {
        case 'PER_HOUSING_UNIT':
            return (basePrice * quantity) / totalStay
        case 'PER_GUEST':
            return (basePrice * totalGuests * quantity) / totalStay
        case 'DAILY':
            return basePrice
        case 'PER_RESERVATION':
            return basePrice / totalStay
        case 'PER_GUEST_DAILY':
            return basePrice * totalGuests
        default:
            return basePrice
    }
}
