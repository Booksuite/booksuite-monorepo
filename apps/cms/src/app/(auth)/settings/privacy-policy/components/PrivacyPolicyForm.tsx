import { TextField } from '@mui/material'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'

export const PrivacyPolicyForm = () => {
    return (
        <FormContainer>
            <FormSection>
                <TextField
                    multiline
                    rows={10}
                    label="Outras regras e observações"
                    /*error={!!errors.}
                            helperText={errors.}
                            {...getFieldProps('')}*/
                />
            </FormSection>
        </FormContainer>
    )
}
