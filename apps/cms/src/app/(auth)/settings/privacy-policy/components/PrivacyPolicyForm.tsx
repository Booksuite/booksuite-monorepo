import { TextField } from '@mui/material'
import { useFormikContext } from 'formik'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { PrivacyPolicyFormData } from '../utils/config'

export const PrivacyPolicyForm = () => {
    const { getFieldProps, touched, errors, isSubmitting } =
        useFormikContext<PrivacyPolicyFormData>()
    return (
        <FormContainer>
            <FormSection>
                <TextField
                    multiline
                    rows={10}
                    label="Outras regras e observações"
                    error={
                        touched.privacyPolicyDescription &&
                        Boolean(errors.privacyPolicyDescription)
                    }
                    helperText={
                        touched.privacyPolicyDescription &&
                        errors.privacyPolicyDescription
                    }
                    disabled={isSubmitting}
                    fullWidth
                    {...getFieldProps('privacyPolicyDescription')}
                />
            </FormSection>
        </FormContainer>
    )
}
