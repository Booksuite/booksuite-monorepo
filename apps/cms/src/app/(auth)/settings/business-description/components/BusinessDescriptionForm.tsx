import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import { Info } from 'lucide-react'

import InputBox from '@/components/atoms/InputBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { BusinessDescriptionFormData } from '../utils/config'

export const BusinessDescriptionForm = () => {
    const { getFieldProps, errors, touched, handleChange } =
        useFormikContext<BusinessDescriptionFormData>()

    return (
        <Form>
            <Stack spacing={8}>
                <Stack spacing={4}>
                    <InputBox
                        label="Nome da Propriedade"
                        isDisabled
                        {...getFieldProps('name')}
                    />
                    <TextAreaBox
                        label="Descrição Curta"
                        maxLength={165}
                        fontSize={'md'}
                        formControl={{
                            isInvalid:
                                !!errors.shortDescription &&
                                touched.shortDescription,
                        }}
                        {...getFieldProps('shortDescription')}
                    />
                    <TextAreaBox
                        label="Descrição Longa - Sobre Nós"
                        maxLength={1000}
                        fontSize={'md'}
                        formControl={{
                            isInvalid:
                                !!errors.description && touched.description,
                        }}
                        {...getFieldProps('description')}
                    />
                </Stack>
                <Stack spacing={4}>
                    <h2 style={{ fontWeight: '600', marginBottom: '0' }}>
                        Banner de compartilhamento
                    </h2>
                    <Box
                        bg={'gray.100'}
                        p={5}
                        borderRadius={'md'}
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Flex align="center" gap={2}>
                            <Info color={'#0B1F51'} />
                            <Text fontSize={'md'} color={'#0B1F51'}>
                                1. A imagem será exibida quando você
                                compartilhar o site em alguma rede social ou
                                aplicativo de mensagens.
                                <br />
                                <br />
                                2. A imagem será utilizada no banner principal
                                do site quando não houver nenhum banner
                                específico cadastrado no menu marketing/banners.
                            </Text>
                        </Flex>
                    </Box>
                    <h2 style={{ fontWeight: '600', marginBottom: '0' }}>
                        Informações do Banner - página inicial
                    </h2>
                    <InputBox
                        label="Título Principal"
                        formControl={{
                            isInvalid:
                                !!errors.bannerTitle && touched.bannerTitle,
                        }}
                        {...getFieldProps('bannerTitle')}
                        onChange={handleChange('bannerTitle')}
                    />
                    <InputBox
                        label="Descrição de Apoio (opcional)"
                        formControl={{
                            isInvalid:
                                !!errors.bannerDescription &&
                                touched.bannerDescription,
                        }}
                        {...getFieldProps('bannerDescription')}
                        onChange={handleChange('bannerDescription')}
                    />
                </Stack>
            </Stack>
        </Form>
    )
}
