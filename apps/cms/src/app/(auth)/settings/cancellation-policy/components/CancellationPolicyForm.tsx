import {
    Box,
    Button,
    HStack,
    IconButton,
    Select,
    Stack,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'
import { CirclePlus, Trash } from 'lucide-react'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { CancellationPolicyFormData } from '../utils/config'
import { DEFAULT_PENALTY_OPTIONS } from '../utils/constants'

export const CancellationPolicyForm = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<CancellationPolicyFormData>()

    return (
        <Form>
            <Stack spacing={4}>
                <HStack spacing={2} alignItems={'center'}>
                    <Switch
                        isChecked={values.applyCancellationTax === true}
                        onChange={(e) =>
                            setFieldValue(
                                'applyCancellationTax',
                                e.target.checked,
                            )
                        }
                    />
                    <h2 style={{ fontWeight: '600', marginBottom: 0 }}>
                        Aplicar taxa de cancelamento
                    </h2>
                </HStack>
                {values.applyCancellationTax === true && (
                    <VStack spacing={4} alignItems={'start'} w={'100%'}>
                        <h2 style={{ fontWeight: 400, marginBottom: 0 }}>
                            Regras de cancelamento padrão
                        </h2>
                        <Select
                            size="lg"
                            onChange={(selectedOption) =>
                                setFieldValue(
                                    'defaultPenaltyBy',
                                    selectedOption.target.value,
                                )
                            }
                        >
                            <option value="" disabled selected hidden>
                                Selecione um tipo de cobrança
                            </option>
                            {DEFAULT_PENALTY_OPTIONS.map(
                                ({ label, value }, index) => (
                                    <option key={index} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </Select>
                        <InputBox
                            label={
                                DEFAULT_PENALTY_OPTIONS.find(
                                    (option) =>
                                        option.value ===
                                        values.defaultPenaltyBy,
                                )?.label || 'Valor padrão (%)'
                            }
                            type="number"
                            error={errors.defaultValue}
                            formControl={{
                                isInvalid:
                                    !!errors.defaultValue &&
                                    touched.defaultValue,
                            }}
                            {...getFieldProps('defaultValue')}
                            onChange={handleChange('defaultValue')}
                            isDisabled={
                                values.defaultPenaltyBy === 'FIRST_NIGHT_AMOUNT'
                            }
                        />

                        <InputNumberBox
                            label="Período de desistência (dias)"
                            error={errors.defaultValue}
                            formControl={{
                                isInvalid:
                                    !!errors.defaultValue &&
                                    touched.defaultValue,
                            }}
                            {...getFieldProps('withdrawalPeriod')}
                            onChange={handleChange('withdrawalPeriod')}
                        />
                        <Box
                            bg={'gray.100'}
                            p={3}
                            borderRadius={'md'}
                            display={'flex'}
                            alignItems={'center'}
                            w={'100%'}
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
                        <HStack spacing={2} alignItems={'center'} mt={4}>
                            <Switch
                                isChecked={values.extraCancellationTax === true}
                                onChange={(e) =>
                                    setFieldValue(
                                        'extraCancellationTax',
                                        e.target.checked,
                                    )
                                }
                            />
                            <h2 style={{ fontWeight: '600', marginBottom: 0 }}>
                                Aplicar taxas de penalização personalizadas
                            </h2>
                        </HStack>

                        {values.extraCancellationTax === true && (
                            <FieldArray name="penaltyRanges">
                                {({ push, remove }) => (
                                    <VStack alignItems={'start'} w={'100%'}>
                                        {values.penaltyRanges.map(
                                            (penalty, index) => (
                                                <Stack
                                                    key={index}
                                                    w="100%"
                                                    spacing={4}
                                                >
                                                    <HStack
                                                        spacing={2}
                                                        alignItems={'center'}
                                                    >
                                                        <h2
                                                            style={{
                                                                fontWeight:
                                                                    '600',
                                                                marginBottom: 0,
                                                            }}
                                                        >
                                                            Taxa de penalização{' '}
                                                            {index + 1}
                                                        </h2>
                                                        <IconButton
                                                            icon={<Trash />}
                                                            colorScheme="red"
                                                            variant="ghost"
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                            aria-label=""
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

                                                    <Select
                                                        size="lg"
                                                        value={
                                                            penalty.penaltyBy
                                                        }
                                                        onChange={(
                                                            selectedOption,
                                                        ) =>
                                                            setFieldValue(
                                                                `penaltyRanges.${index}.penaltyBy`,
                                                                selectedOption
                                                                    .target
                                                                    .value,
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                            selected
                                                            hidden
                                                        >
                                                            Selecione um tipo de
                                                            cobrança
                                                        </option>
                                                        {DEFAULT_PENALTY_OPTIONS.map(
                                                            (
                                                                {
                                                                    label,
                                                                    value,
                                                                },
                                                                optionIndex,
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        optionIndex
                                                                    }
                                                                    value={
                                                                        value
                                                                    }
                                                                >
                                                                    {label}
                                                                </option>
                                                            ),
                                                        )}
                                                    </Select>

                                                    <InputBox
                                                        label={
                                                            DEFAULT_PENALTY_OPTIONS.find(
                                                                (option) =>
                                                                    option.value ===
                                                                    penalty.penaltyBy,
                                                            )?.label ||
                                                            'Valor padrão (%)'
                                                        }
                                                        type="number"
                                                        formControl={{
                                                            isInvalid:
                                                                !!errors
                                                                    .penaltyRanges?.[
                                                                    index
                                                                ] &&
                                                                touched
                                                                    .penaltyRanges?.[
                                                                    index
                                                                ]?.value,
                                                        }}
                                                        {...getFieldProps(
                                                            `penaltyRanges.${index}.value`,
                                                        )}
                                                        onChange={handleChange(
                                                            `penaltyRanges.${index}.value`,
                                                        )}
                                                    />
                                                </Stack>
                                            ),
                                        )}
                                        <Button
                                            mt={3}
                                            variant="outline"
                                            width={'100%'}
                                            leftIcon={<CirclePlus />}
                                            mb={4}
                                            size={'lg'}
                                            onClick={() =>
                                                push({
                                                    id: '',
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
                                            w={'100%'}
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
                                    </VStack>
                                )}
                            </FieldArray>
                        )}
                    </VStack>
                )}

                <VStack alignItems={'start'} mt={4} w={'100%'} spacing={4}>
                    <h2 style={{ fontWeight: '600', marginBottom: 0 }}>
                        Descrição da política de cancelamento
                    </h2>

                    <TextAreaBox
                        label="Descrição dinâmica (exibida para o hóspede)"
                        fontSize={'md'}
                        maxLength={650}
                        formControl={{
                            isInvalid:
                                !!errors.dynamicDescription &&
                                touched.dynamicDescription,
                        }}
                        {...getFieldProps('dynamicDescription')}
                    />

                    <TextAreaBox
                        label="Demais regras e observações"
                        maxLength={650}
                        fontSize={'md'}
                        color={'#0B1F51'}
                        p={3}
                        border={'1px solid #D9E2EC'}
                        borderRadius={'md'}
                        formControl={{
                            isInvalid:
                                !!errors.otherDescription &&
                                touched.otherDescription,
                        }}
                        {...getFieldProps('otherDescription')}
                    />

                    {/*
                    (TODO: Implementar Templates)
                    <Box
                        bg={'gray.100'}
                        p={3}
                        borderRadius={'md'}
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
                    </Box>*/}
                </VStack>
            </Stack>
        </Form>
    )
}
