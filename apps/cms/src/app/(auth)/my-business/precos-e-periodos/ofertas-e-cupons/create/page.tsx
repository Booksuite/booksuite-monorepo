'use client'

import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { PageHeader } from '@/components/organisms/PageHeader'
import { OfferCouponsForm } from '../componentes/OfferCouponsForm'
import {
    createFormInitialValues,
    OfferCouponsFormData,
    offerCouponsFormSchema,
} from '../utils/config'

export default function CreateOfferCoupon() {
    const companyId = useCurrentCompanyId()
    const toast = useToast()

    async function handleSubmit(formData: OfferCouponsFormData) {
        console.log(formData)
    }

    return (
        <div>
            <PageHeader
                title="Criar Oferta e Cupons"
                backButtonHref="/my-business/precos-e-periodos/ofertas-e-cupons"
                backLButtonLabel="Ofertas e Cupons"
            />

            <Formik<OfferCouponsFormData>
                initialValues={createFormInitialValues()}
                validationSchema={offerCouponsFormSchema}
                onSubmit={handleSubmit}
            >
                <OfferCouponsForm />
            </Formik>
        </div>
    )
}
