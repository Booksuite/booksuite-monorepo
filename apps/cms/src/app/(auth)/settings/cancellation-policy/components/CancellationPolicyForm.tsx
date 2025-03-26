import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Stack,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'
import { CirclePlus, ScanText, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { CancellationPolicyFormData } from '../utils/config'

export const CancellationPolicyForm = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<CancellationPolicyFormData>()

    const [isPenaltyEnabled, setIsPenaltyEnabled] = useState(
        values.penaltyRanges.length > 0,
    )

    const handleSwitchChange = (checked: boolean) => {
        setIsPenaltyEnabled(checked)

        if (checked && values.penaltyRanges.length === 0) {
            setFieldValue('penaltyRanges', [
                {
                    daysBeforeCheckIn: '',
                    penaltyBy: 'RESERVATION_PERCENTAGE',
                    value: '',
                },
            ])
        }
    }

    return (
        <Form>
            <Stack spacing={4}>
                <HStack spacing={2} alignItems={'center'}>
                    <Switch
                        isChecked={
                            values.defaultPenaltyBy !== 'FIRST_NIGHT_AMOUNT'
                        }
                        onChange={(e) =>
                            setFieldValue(
                                'defaultPenaltyBy',
                                e.target.checked
                                    ? 'RESERVATION_PERCENTAGE'
                                    : 'FIRST_NIGHT_AMOUNT',
                            )
                        }
                    />
                    <h2 style={{ fontWeight: '600', marginBottom: 0 }}>
                        Aplicar taxa de cancelamento
                    </h2>
                </HStack>
                {values.defaultPenaltyBy !== 'FIRST_NIGHT_AMOUNT' && (
                    <VStack spacing={4} alignItems={'start'} w={'100%'}>
                        <h2 style={{ fontWeight: 400, marginBottom: 0 }}>
                            Regras de cancelamento padrão
                        </h2>
                        <SelectBox
                            label="Seletor de penalização"
                            error={errors.defaultPenaltyBy}
                            formControl={{
                                isInvalid:
                                    !!errors.defaultPenaltyBy &&
                                    touched.defaultPenaltyBy,
                            }}
                            {...getFieldProps('defaultPenaltyBy')}
                            onChange={handleChange('defaultPenaltyBy')}
                        ></SelectBox>
                        <InputBox
                            label="Valor padrão (%)"
                            error={errors.defaultValue}
                            formControl={{
                                isInvalid:
                                    !!errors.defaultValue &&
                                    touched.defaultValue,
                            }}
                            {...getFieldProps('defaultValue')}
                            onChange={handleChange('defaultValue')}
                        />
                        <InputNumberBox
                            label="Período de desistência (dias)"
                            error={errors.defaultValue}
                            formControl={{
                                isInvalid:
                                    !!errors.defaultValue &&
                                    touched.defaultValue,
                            }}
                            {...getFieldProps('defaultValue')}
                            onChange={handleChange('defaultValue')}
                        />
                        <Box
                            bg={'gray.100'}
                            p={3}
                            borderRadius={'md'}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <Text fontSize={'md'} color={'#0B1F51'}>
                                A <b>taxa de cancelamento padrão</b> é aplicada
                                sempre que uma reserva for cancelada após o{' '}
                                <b>período de arrependimento</b> da compra de
                                acordo com o CDC (código de defesa do consumidor
                                - artigo 49).
                                <br />
                                <br />
                                <b>
                                    Dentro do período de desistência é
                                    reembolsado 100% do valor pago.
                                </b>
                            </Text>
                        </Box>
                    </VStack>
                )}

                <HStack spacing={2} alignItems={'center'} mt={4}>
                    <Switch
                        isChecked={isPenaltyEnabled}
                        onChange={(e) => handleSwitchChange(e.target.checked)}
                    />
                    <h2 style={{ fontWeight: '600', marginBottom: 0 }}>
                        Aplicar taxas de penalização personalizadas
                    </h2>
                </HStack>

                {isPenaltyEnabled && (
                    <FieldArray name="penaltyRanges">
                        {({ push, remove }) => (
                            <VStack alignItems={'start'} w={'100%'}>
                                {values.penaltyRanges.map((penalty, index) => (
                                    <Stack key={index} w="100%" spacing={4}>
                                        <HStack
                                            spacing={2}
                                            alignItems={'center'}
                                        >
                                            <h2
                                                style={{
                                                    fontWeight: '600',
                                                    marginBottom: 0,
                                                }}
                                            >
                                                Taxa de penalização {index + 1}
                                            </h2>
                                            <IconButton
                                                icon={<Trash />}
                                                colorScheme="red"
                                                variant="ghost"
                                                onClick={() => remove(index)}
                                                aria-label={''}
                                            />
                                        </HStack>
                                        <InputNumberBox
                                            label="Dias antes do check-in"
                                            {...getFieldProps(
                                                `penaltyRanges.${index}.daysBeforeCheckIn`,
                                            )}
                                            onChange={handleChange(
                                                `penaltyRanges.${index}.daysBeforeCheckIn`,
                                            )}
                                        />
                                        <SelectBox
                                            label="Seletor de penalização"
                                            {...getFieldProps(
                                                `penaltyRanges.${index}.penaltyBy`,
                                            )}
                                        />
                                        <InputBox
                                            label="Valor em %"
                                            {...getFieldProps(
                                                `penaltyRanges.${index}.value`,
                                            )}
                                        />
                                        <Button
                                            mt={3}
                                            variant="outline"
                                            width={'100%'}
                                            leftIcon={<CirclePlus />}
                                            mb={4}
                                            size={'lg'}
                                            onClick={() =>
                                                push({
                                                    daysBeforeCheckIn: '',
                                                    penaltyBy:
                                                        'RESERVATION_PERCENTAGE',
                                                    value: '',
                                                })
                                            }
                                        >
                                            Adicionar taxa de penalização
                                        </Button>
                                        <Box
                                            bg={'gray.100'}
                                            p={3}
                                            borderRadius={'md'}
                                            display={'flex'}
                                            alignItems={'center'}
                                        >
                                            <Text
                                                fontSize={'md'}
                                                color={'#0B1F51'}
                                            >
                                                As taxas adicionais de
                                                cancelamento são multas
                                                aplicadas para cancelamentos
                                                próximos à data do check-in,
                                                podendo haver uma ou mais taxas
                                                adicionais.
                                                <br />
                                                <br />
                                                <b>Atenção:</b> esta taxa não é
                                                cumulativa com a taxa de
                                                cancelamento padrão.
                                                <br />
                                                <br />
                                                Essa cobrança visa compensar
                                                possíveis perdas do
                                                estabelecimento, garantindo um
                                                ressarcimento adequado diante do
                                                risco de não conseguir realocar
                                                a acomodação no mesmo período.
                                            </Text>
                                        </Box>
                                    </Stack>
                                ))}
                            </VStack>
                        )}
                    </FieldArray>
                )}

                <VStack alignItems={'start'} mt={4} w={'100%'} spacing={4}>
                    <h2 style={{ fontWeight: '600', marginBottom: 0 }}>
                        Descrição da política de cancelamento
                    </h2>
                    <Box
                        bg={'gray.100'}
                        p={3}
                        borderRadius={'md'}
                        display={'flex'}
                        alignItems={'center'}
                    >
                        {/*Text Exemple*/}
                        <Text
                            fontSize={'md'}
                            color={'#0B1F51'}
                            p={3}
                            border={0}
                        >
                            <h4>Descrição dinâmica (exibida para o hóspede)</h4>
                            1. Cancelamento ou troca após o período de
                            desistência obrigatório de 7 dias após a data de
                            efetivação da reserva será cobrado uma taxa de
                            cancelamento de 20% sobre o valor total da reserva;
                            <br />
                            <br />
                            2. O período de desistência obrigatório só é válido,
                            caso a reserva seja efetuada com antecedência mínima
                            de 8 dias até o check-in. Caso contrário, será
                            aplicado a taxa de cancelamento padrão;
                            <br />
                            <br />
                            3. Cancelamento ou troca em até 14 dias antes do
                            check-in, será cobrado uma multa de 50% do valor
                            total da reserva;
                            <br />
                            <br />
                            4. Cancelamento ou troca em até 4 dias antes do
                            check-in, será cobrado uma multa de 100% do valor
                            total da reserva;
                        </Text>
                    </Box>

                    {/*Text Exemple*/}
                    <Text
                        fontSize={'md'}
                        color={'#0B1F51'}
                        p={3}
                        border={'1px solid #D9E2EC'}
                        borderRadius={'md'}
                    >
                        <h4>Demais regras e observações</h4>
                        - Em caso de saída antecipada durante a estadia, não
                        haverá reembolso do valor pago e/ou será efetuada a
                        cobrança do valor em aberto referente ao total da
                        reserva.
                        <br />
                        <br />
                        - Em caso de alteração de datas da estadia serão
                        aplicadas as políticas e taxas de cancelamento. Caso a
                        nova data possua uma tarifa diferente da primeira data,
                        será acertado a diferença além da multa padrão, seja
                        para mais ou para menos.
                        <br />
                        <br />- Em casos extremos de fechamento das atividades
                        por ordem de governos, autoridades locais de saúde ou
                        qualquer outro motivo de caráter excepcional, todas
                        reservas no período serão reagendadas, sem custo
                        adicional, desde que o tarifário da primeira data
                        reserva mantenha o mesmo valor da nova data, caso
                        contrário, será acertado a diferença. Demais condições
                        não previstas neste descritivo serão esclarecidas caso a
                        caso, conforme regras e políticas internas.
                    </Text>

                    <Flex
                        bg={'gray.100'}
                        p={3}
                        borderRadius={'md'}
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        width={'100%'}
                        textAlign={'center'}
                        gap={4}
                    >
                        <br />
                        <br />
                        <ScanText size={'40'} />
                        <h3>
                            Se necessário personalize nosso modelo de políticas
                            de cancelamento para o seu negócio.
                        </h3>
                        <Link
                            href="/settings/cancellation-policy/templates"
                            passHref
                        >
                            <Button
                                variant="outline"
                                width={'100%'}
                                leftIcon={<CirclePlus size={23} />}
                                mb={4}
                                border={0}
                                fontSize={'md'}
                                as="a"
                            >
                                Selecionar Modelo
                            </Button>
                        </Link>
                    </Flex>
                </VStack>

                <Button type="submit" size={'lg'}>
                    Salvar
                </Button>
            </Stack>
        </Form>
    )
}
