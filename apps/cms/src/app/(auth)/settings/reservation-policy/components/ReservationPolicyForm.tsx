import { Box, TextField, Typography } from '@mui/material'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'

export const ReservationPolicyForm = () => {
    return (
        <FormContainer>
            <FormSection>
                <TextField
                    multiline
                    rows={10}
                    label="Descrição da Política"
                    /*error={!!errors.}
                            helperText={errors.}
                            {...getFieldProps('')}*/
                />
            </FormSection>

            <FormSection>
                <Box
                    bgcolor={'grey.100'}
                    p={4}
                    borderRadius={1}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <Typography variant="body1" color={'#0B1F51'}>
                        <b>Campos dinâmicos:</b> utilize as variáveis dinâmicas
                        para preencher as informações automáticas com base nas
                        configurações do seu negócio.
                        <br />
                        <br />
                        Nome da empresa: <b>company-name</b>
                        <br />
                        <br />
                        Tipo de garantia de reserva:{' '}
                        <b>ReservationDepositType </b>
                        <br />
                        <br />
                        Valor da garantia de reserva:
                        <b>reservationDepositTypeValue </b>
                        <br />
                        <br />
                        Métodos de pagamento: <b>paymentMethods </b>
                        <br />
                        <br />
                        Valor cobrado referente a impostos e taxas: <b>tax</b>
                    </Typography>
                </Box>
            </FormSection>
        </FormContainer>
    )
}
