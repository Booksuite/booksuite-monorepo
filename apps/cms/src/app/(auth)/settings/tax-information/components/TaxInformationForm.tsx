import { Box, Button, Flex, Select, Stack, Text } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import { Info } from 'lucide-react'

import InputBox from '@/components/atoms/InputBox'
import { TaxInformationData } from '../utils/config'
import { DOC_TYPE } from '../utils/constants'

export const TaxInformationForm = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<TaxInformationData>()

    const isCNPJ = values.docType === 'CNPJ'

    return (
        <Form>
            <div className="tax_information">
                <Stack mt={8} spacing={4} align="stretch">
                    <h2 style={{ fontWeight: '600', marginBottom: '0' }}>
                        Dados do Responsável
                    </h2>
                    <InputBox
                        label="Nome do Responsável"
                        error={errors.responsible}
                        formControl={{
                            isInvalid:
                                !!errors.responsible && touched.responsible,
                        }}
                        {...getFieldProps('responsible')}
                    />
                    <InputBox
                        label="E-mail do Responsável"
                        error={errors.responsibleEmail}
                        formControl={{
                            isInvalid:
                                !!errors.responsibleEmail &&
                                touched.responsibleEmail,
                        }}
                        {...getFieldProps('responsibleEmail')}
                    />
                    <InputBox
                        label="Telefone Celular"
                        error={errors.responsiblePhone}
                        formControl={{
                            isInvalid:
                                !!errors.responsiblePhone &&
                                touched.responsiblePhone,
                        }}
                        {...getFieldProps('responsiblePhone')}
                    />

                    <Box
                        bg={'gray.100'}
                        p={3}
                        borderRadius={'md'}
                        display={'flex'}
                        alignItems={'center'}
                        w={'100%'}
                    >
                        <Flex align="center" gap={2}>
                            <Info size={23} color={'#0B1F51'} />
                            <Text fontSize={'md'} color={'#0B1F51'}>
                                <b>Importante:</b> os dados do responsável pela
                                empresa não serão exibidos para o seu cliente.
                            </Text>
                        </Flex>
                    </Box>
                </Stack>
                <Stack mt={8} spacing={4} align="stretch">
                    <h2 style={{ fontWeight: '600', marginBottom: '0' }}>
                        Informações do Negócio
                    </h2>
                    <Select
                        size="lg"
                        onChange={(selectedOption) =>
                            setFieldValue(
                                'docType',
                                selectedOption.target.value,
                            )
                        }
                    >
                        <option value="" disabled selected hidden>
                            Selecione um tipo de cobrança
                        </option>
                        {DOC_TYPE.map(({ value }, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </Select>

                    <InputBox
                        label={
                            DOC_TYPE.find(
                                (option) => option.value === values.docType,
                            )?.value || 'CPF'
                        }
                        error={errors.identification}
                        formControl={{
                            isInvalid:
                                !!errors.identification &&
                                touched.identification,
                        }}
                        {...getFieldProps('identification')}
                        onChange={handleChange('identification')}
                    />

                    {isCNPJ && (
                        <>
                            {/*<InputBox label="Razão Social" 
                                error={errors.}
                                formControl={{
                                    isInvalid:
                                        !!errors.&&
                                        touched.,
                                }}
                                {...getFieldProps('')}
                                onChange={handleChange('')}
                            /> */}
                            <InputBox
                                label="Incrição Estadual (opcional)"
                                error={errors.stateRegistration}
                                formControl={{
                                    isInvalid:
                                        !!errors.stateRegistration &&
                                        touched.stateRegistration,
                                }}
                                {...getFieldProps('stateRegistration')}
                                onChange={handleChange('stateRegistration')}
                            />

                            <InputBox
                                label="Incrição Municipal (opcional)"
                                error={errors.municipalRegistration}
                                formControl={{
                                    isInvalid:
                                        !!errors.municipalRegistration &&
                                        touched.municipalRegistration,
                                }}
                                {...getFieldProps('municipalRegistration')}
                                onChange={handleChange('municipalRegistration')}
                            />
                        </>
                    )}

                    <InputBox
                        label="CEP"
                        error={errors.zipcode}
                        formControl={{
                            isInvalid: !!errors.zipcode && touched.zipcode,
                        }}
                        {...getFieldProps('zipcode')}
                        onChange={handleChange('zipcode')}
                    />

                    <InputBox
                        label="Estado"
                        error={errors.state}
                        formControl={{
                            isInvalid: !!errors.state && touched.state,
                        }}
                        {...getFieldProps('state')}
                        onChange={handleChange('state')}
                    />

                    <InputBox
                        label="Cidade"
                        error={errors.city}
                        formControl={{
                            isInvalid: !!errors.city && touched.city,
                        }}
                        {...getFieldProps('city')}
                        onChange={handleChange('city')}
                    />

                    <InputBox
                        label="País"
                        error={errors.country}
                        formControl={{
                            isInvalid: !!errors.country && touched.country,
                        }}
                        {...getFieldProps('country')}
                        onChange={handleChange('country')}
                    />
                </Stack>
                <Stack mt={8}>
                    <Button type="submit" size="lg">
                        Salvar
                    </Button>
                </Stack>
            </div>
        </Form>
    )
}
