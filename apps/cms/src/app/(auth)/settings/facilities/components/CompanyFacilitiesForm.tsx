import { Button } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'

import { CompanyFacilitiesData } from '../utils/config'

import { CompanyFacilitiesField } from './CompanyFacilitiesField'

export const CompanyFacilitiesForm: React.FC = () => {
    const { values, setFieldValue } = useFormikContext<CompanyFacilitiesData>()

    return (
        <Form>
            <CompanyFacilitiesField />

            <Button type="submit" size="lg">
                Salvar
            </Button>
        </Form>
    )
}
