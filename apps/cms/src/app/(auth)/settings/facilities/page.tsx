'use client'

import { Formik } from 'formik'

import { PageHeader } from '@/components/organisms/PageHeader'

import { CompanyFacilitiesForm } from './components/CompanyFacilitiesForm'
import {
    CompanyFacilitiesData,
    createFacilitiesInitialValues,
    facilitiesFormSchema,
} from './utils/config'

export default function CompanyFacilities() {
    async function handleSubmit() {}

    return (
        <div className="amenities">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Comodidades</PageHeader.Title>
            </PageHeader.Root>

            <Formik<CompanyFacilitiesData>
                initialValues={createFacilitiesInitialValues()}
                validationSchema={facilitiesFormSchema}
                onSubmit={handleSubmit}
            >
                <CompanyFacilitiesForm />
            </Formik>
        </div>
    )
}
