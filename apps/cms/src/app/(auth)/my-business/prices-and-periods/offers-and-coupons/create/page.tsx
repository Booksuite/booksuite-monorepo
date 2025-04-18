'use client'

import { useCreateOffer, useSearchHousingUnitTypes } from '@booksuite/sdk'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { OffersAndCouponsForm } from '../components/OffersAndCouponsForm'
import type { OfferFormData } from '../utils/config'
import {
    createOfferFormInitialValues,
    offerFormSchema,
    transformOfferFormDataForSubmit,
} from '../utils/config'

export default function CreateOffer() {
    const { back } = useRouter()
    const companyId = useCurrentCompanyId()
    const { mutateAsync: createOffer } = useCreateOffer()
    const { data: housingUnitTypes } = useSearchHousingUnitTypes(
        { companyId },
        {
            pagination: { itemsPerPage: 1000, page: 1 },
        },
    )

    const handleSubmit = async (formData: OfferFormData) => {
        const apiData = transformOfferFormDataForSubmit({
            ...formData,
            companyId,
        })

        try {
            await createOffer({ companyId, data: apiData })

            enqueueSnackbar('Oferta criada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar(`Erro ao criar oferta`, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 5000,
            })
        }
    }

    return (
        <>
            <PageHeader
                title="Criar Oferta"
                backLButtonLabel="Ofertas e Cupons"
                backButtonHref="/my-business/prices-and-periods/offers-and-coupons"
            />
            <Formik<OfferFormData>
                initialValues={createOfferFormInitialValues()}
                validationSchema={offerFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <OffersAndCouponsForm
                        availableHousingUnitTypes={housingUnitTypes?.items}
                    />
                </FormikController>
            </Formik>
        </>
    )
}
