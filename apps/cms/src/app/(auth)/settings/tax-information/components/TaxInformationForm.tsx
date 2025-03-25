import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { Info } from 'lucide-react'
import { useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import SelectBox from '@/components/atoms/SelectBox'

export const TaxInformationForm = () => {
    const [documentType, setDocumentType] = useState('cpf')

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDocumentType(e.target.value)
    }

    return (
        <div className="tax_information">
            <Stack mt={8} spacing={4} align="stretch">
                <h2 style={{ fontWeight: '600', marginBottom: '0' }}>
                    Dados do Responsável
                </h2>
                <InputBox label="Nome do Responsável" />
                <InputBox label="E-mail do Responsável" />
                <InputBox label="Telefone Celular" />

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
                <SelectBox
                    label="Tipo de Documento"
                    options={[
                        { label: 'CPF', value: 'cpf' },
                        { label: 'CNPJ', value: 'cnpj' },
                    ]}
                    value={documentType}
                    onChange={handleSelectChange}
                />

                {documentType === 'cpf' ? (
                    <InputBox label="CPF" />
                ) : (
                    <InputBox label="CNPJ" />
                )}

                <InputBox label="Razão Social" />
                <InputBox label="Incrição Estadual (opcional)" />
                <InputBox label="Incrição Municipal (opcional)" />
                <InputBox label="Estado" />
                <InputBox label="Cidade" />
                <InputBox label="País" />
            </Stack>
            <Stack mt={8}>
                <Button type="submit" size="lg">
                    Salvar
                </Button>
            </Stack>
        </div>
    )
}
