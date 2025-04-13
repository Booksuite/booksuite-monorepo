'use client'

import {
    useSearchHousingUnitTypes,
    useSearchOffers,
    useUpdateOffer,
} from '@booksuite/sdk'
import { CircularProgress, Stack } from '@mui/material'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'

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

    const { data: offers, isLoading } = useSearchOffers(
        { companyId },
        {
            pagination: { itemsPerPage: 1000, page: 1 },
        },
    )

    const offer = offers?.items?.find((item) => item.id === id)

    useEffect(() => {
        if (!isLoading && !offer) {
            enqueueSnackbar('Oferta não encontrada', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 5000,
            })
            back()
        }
    }, [isLoading, offer, back])

    const handleSubmit = async (formData: OfferFormData) => {
        const apiData = transformOfferFormDataForSubmit({
            ...formData,
            companyId,
        })

        try {
            await updateOffer({ id, data: apiData })

            enqueueSnackbar('Oferta atualizada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar(`Erro ao atualizar oferta`, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 5000,
            })
        }
    }

    if (isLoading) {
        return (
            <Stack alignItems="center" justifyContent="center" height="100vh">
                <CircularProgress />
            </Stack>
        )
    }

    if (!offer) {
        return null
    }

    return (
        <>
            <PageHeader
                title="Editar Oferta"
                backLButtonLabel="Ofertas e Cupons"
                backButtonHref="/my-business/prices-and-periods/offers-and-coupons"
            />
            <Formik<OfferFormData>
                initialValues={createOfferFormInitialValues(offer)}
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
