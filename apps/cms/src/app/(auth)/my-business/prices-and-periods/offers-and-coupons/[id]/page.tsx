'use client'

import {
    useSearchHousingUnitTypes,
    useSearchOffers,
    useUpdateOffer,
} from '@booksuite/sdk'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { OffersAndCouponsForm } from '../components/OffersAndCouponsForm'
import type { OfferFormData } from '../utils/config'
import {
    createOfferFormInitialValues,
    offerFormSchema,
    transformOfferFormDataForSubmit,
} from '../utils/config'

type Props = {
    params: {
        id: string
    }
}

export default function UpdateOffer({ params: { id } }: Props) {
    const { back } = useRouter()
    const companyId = useCurrentCompanyId()
    const { mutateAsync: updateOffer } = useUpdateOffer()
    const { data: housingUnitTypes } = useSearchHousingUnitTypes(
        { companyId },
        {
            pagination: { itemsPerPage: 1000, page: 1 },
        },
    )

    const { data: offers } = useSearchOffers(
        { companyId },
        {
            pagination: { itemsPerPage: 1000, page: 1 },
        },
    )

    const offer = offers?.items?.find((item) => item.id === id)

    const handleSubmit = async (formData: OfferFormData) => {
        const apiData = transformOfferFormDataForSubmit(formData)

        try {
            await updateOffer({ id, companyId, data: apiData })

            enqueueSnackbar('Oferta atualizada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch (error) {
            enqueueSnackbar(
                `Erro ao atualizar oferta ${getErrorMessage(error)}`,
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 5000,
                },
            )
        }
    }

    if (!companyId) {
        return (
            <div>
                <PageHeader
                    title="Editar Oferta"
                    backLButtonLabel="Ofertas e Cupons"
                    backButtonHref="/my-business/prices-and-periods/offers-and-coupons"
                />
                <div>Carregando dados da empresa...</div>
            </div>
        )
    }

    if (!offer) {
        return (
            <div>
                <PageHeader
                    title="Editar Oferta"
                    backLButtonLabel="Ofertas e Cupons"
                    backButtonHref="/my-business/prices-and-periods/offers-and-coupons"
                />
                <div>Carregando dados da oferta...</div>
            </div>
        )
    }

    return (
        <>
            <PageHeader
                title="Editar Oferta"
                backLButtonLabel="Ofertas e Cupons"
                backButtonHref="/my-business/prices-and-periods/offers-and-coupons"
            />
            <Formik<OfferFormData>
                initialValues={createOfferFormInitialValues({
                    ...offer,
                    availableHousingUnitTypes: housingUnitTypes?.items,
                })}
                validationSchema={offerFormSchema}
                onSubmit={handleSubmit}
                enableReinitialize
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
