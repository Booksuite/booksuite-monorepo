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
    offerCouponsPaginated,
} from '../utils/config'

interface UpdateOfferCouponsProps {
    params: { id: string }
}

export default function UpdateOfferCoupon({ params }: UpdateOfferCouponsProps) {
    const companyId = useCurrentCompanyId()

    //Executar o useOfferCoupon aqui
    const offerCoupon = offerCouponsPaginated.items[parseInt(params.id)]
    const toast = useToast()    

    async function handleSubmit(formData: OfferCouponsFormData) {
        //MutateAsync aqui
        console.log(formData)
    }

    return (
        <div>
            <PageHeader
                title="Editar Oferta e Cupom"
                backButtonHref="/my-business/precos-e-periodos/ofertas-e-cupons"
                backLButtonLabel="Ofertas e Cupons"
            />

            {!!offerCoupon && (
                <Formik<OfferCouponsFormData>
                    initialValues={createFormInitialValues(offerCoupon)}
                    validationSchema={offerCouponsFormSchema}
                    onSubmit={handleSubmit}
                >
                    <OfferCouponsForm />
                </Formik>
            )}
        </div>
    )
}
