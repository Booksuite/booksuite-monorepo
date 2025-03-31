import {
    Box,
    Button,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { FieldArray, Form, useFormikContext } from 'formik'
import { CirclePlus, Trash } from 'lucide-react'

import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { CancellationPolicyFormData } from '../utils/config'
import { DEFAULT_PENALTY_OPTIONS } from '../utils/constants'

export const CancellationPolicyForm = () => {
    const { getFieldProps, touched, errors, values, setFieldValue } =
        useFormikContext<CancellationPolicyFormData>()

    return (
        <Form>
            <Stack spacing={4}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Switch
                        checked={values.applyCancellationTax === true}
                        onChange={(e) =>
                            setFieldValue(
                                'applyCancellationTax',
                                e.target.checked,
                            )
                        }
                    />
                    <h2 style={{ fontWeight: '600' }}>
                        Aplicar taxa de cancelamento
                    </h2>
                </Stack>
                {values.applyCancellationTax === true && (
                    <Stack spacing={2} alignItems="flex-start" width="100%">
                        <h3 style={{ fontWeight: '400' }}>
                            Regras de cancelamento padrão
                        </h3>
                        <FormControl fullWidth>
                            <Select
                                value={values.defaultPenaltyBy}
                                onChange={(selectedOption) =>
                                    setFieldValue(
                                        'defaultPenaltyBy',
                                        selectedOption.target.value,
                                    )
                                }
                                displayEmpty
                                variant="outlined"
                                style={{
                                    border: '1px solid #D9E2EC',
                                    borderRadius: '8px',
                                    padding: '6px',
                                    color: '#01337D',
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Selecione um tipo de cobrança
                                </MenuItem>
                                {DEFAULT_PENALTY_OPTIONS.map(
                                    ({ label, value }, index) => (
                                        <MenuItem key={index} value={value}>
                                            {label}
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                        </FormControl>
                        <InputNumberBox
                            label={
                                DEFAULT_PENALTY_OPTIONS.find(
                                    (option) =>
                                        option.value ===
                                        values.defaultPenaltyBy,
                                )?.label || 'Valor padrão (%)'
                            }
                            error={errors.defaultValue}
                            formControl={{
                                isInvalid:
                                    !!errors.defaultValue &&
                                    touched.defaultValue,
                            }}
                            {...getFieldProps('defaultValue')}
                            value={values.defaultValue}
                            onChange={(value) =>
                                setFieldValue('defaultValue', value)
                            }
                            disabled={
                                values.defaultPenaltyBy === 'FIRST_NIGHT_AMOUNT'
                            }
                        />

                        <InputNumberBox
                            label="Período de desistência (dias)"
                            error={errors.withdrawalPeriod}
                            formControl={{
                                isInvalid:
                                    !!errors.withdrawalPeriod &&
                                    touched.withdrawalPeriod,
                            }}
                            {...getFieldProps('withdrawalPeriod')}
                            value={values.withdrawalPeriod}
                            onChange={(value) =>
                                setFieldValue('withdrawalPeriod', value)
                            }
                        />
                        <Box
                            bgcolor="grey.100"
                            p={3}
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            width="100%"
                        >
                            <Typography variant="body2" color="#0B1F51">
                                A <strong>taxa de cancelamento padrão</strong> é
                                aplicada sempre que uma reserva for cancelada
                                após o{' '}
                                <strong>período de arrependimento</strong> da
                                compra de acordo com o CDC (código de defesa do
                                consumidor - artigo 49).
                                <br />
                                <br />
                                <strong>
                                    Dentro do período de desistência é
                                    reembolsado 100% do valor pago.
                                </strong>
                            </Typography>
                        </Box>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            mt={4}
                        >
                            <Switch
                                checked={values.extraCancellationTax === true}
                                onChange={(e) =>
                                    setFieldValue(
                                        'extraCancellationTax',
                                        e.target.checked,
                                    )
                                }
                            />
                            <h3 style={{ fontWeight: '600' }}>
                                Aplicar taxas de penalização personalizadas
                            </h3>
                        </Stack>

                        {values.extraCancellationTax === true && (
                            <FieldArray name="penaltyRanges">
                                {({ push, remove }) => (
                                    <Stack spacing={4} width="100%">
                                        {values.penaltyRanges.map(
                                            (penalty, index) => (
                                                <Stack
                                                    key={index}
                                                    spacing={2}
                                                    width="100%"
                                                >
                                                    <Stack
                                                        direction="row"
                                                        spacing={2}
                                                        alignItems="center"
                                                    >
                                                        <h2
                                                            style={{
                                                                fontWeight:
                                                                    '600',
                                                            }}
                                                        >
                                                            Taxa de penalização{' '}
                                                            {index + 1}
                                                        </h2>
                                                        <IconButton
                                                            color="error"
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                            aria-label="delete"
                                                        >
                                                            <Trash />
                                                        </IconButton>
                                                    </Stack>

                                                    <InputNumberBox
                                                        label="Dias antes do check-in"
                                                        {...getFieldProps(
                                                            `penaltyRanges.${index}.daysBeforeCheckIn`,
                                                        )}
                                                        value={`penaltyRanges.${index}.daysBeforeCheckIn`}
                                                        onChange={(value) =>
                                                            setFieldValue(
                                                                '`penaltyRanges.${index}.daysBeforeCheckIn`',
                                                                value,
                                                            )
                                                        }
                                                    />

                                                    <FormControl fullWidth>
                                                        <Select
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
                                                            displayEmpty
                                                        >
                                                            <MenuItem
                                                                value=""
                                                                disabled
                                                            >
                                                                Selecione um
                                                                tipo de cobrança
                                                            </MenuItem>
                                                            {DEFAULT_PENALTY_OPTIONS.map(
                                                                (
                                                                    {
                                                                        label,
                                                                        value,
                                                                    },
                                                                    optionIndex,
                                                                ) => (
                                                                    <MenuItem
                                                                        key={
                                                                            optionIndex
                                                                        }
                                                                        value={
                                                                            value
                                                                        }
                                                                    >
                                                                        {label}
                                                                    </MenuItem>
                                                                ),
                                                            )}
                                                        </Select>
                                                    </FormControl>

                                                    <InputNumberBox
                                                        label={
                                                            DEFAULT_PENALTY_OPTIONS.find(
                                                                (option) =>
                                                                    option.value ===
                                                                    penalty.penaltyBy,
                                                            )?.label ||
                                                            'Valor padrão (%)'
                                                        }
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
                                                        value={`penaltyRanges.${index}.value`}
                                                        onChange={(value) =>
                                                            setFieldValue(
                                                                `penaltyRanges.${index}.value`,
                                                                value,
                                                            )
                                                        }
                                                    />
                                                </Stack>
                                            ),
                                        )}
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<CirclePlus />}
                                            size="large"
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
                                            bgcolor="grey.100"
                                            p={3}
                                            borderRadius="md"
                                            display="flex"
                                            alignItems="center"
                                            width="100%"
                                        >
                                            <Typography
                                                variant="body2"
                                                color="#0B1F51"
                                            >
                                                As taxas adicionais de
                                                cancelamento são multas
                                                aplicadas para cancelamentos
                                                próximos à data do check-in,
                                                podendo haver uma ou mais taxas
                                                adicionais.
                                                <br />
                                                <br />
                                                <strong>Atenção:</strong> esta
                                                taxa não é cumulativa com a taxa
                                                de cancelamento padrão.
                                                <br />
                                                <br />
                                                Essa cobrança visa compensar
                                                possíveis perdas do
                                                estabelecimento, garantindo um
                                                ressarcimento adequado diante do
                                                risco de não conseguir realocar
                                                a acomodação no mesmo período.
                                            </Typography>
                                        </Box>
                                    </Stack>
                                )}
                            </FieldArray>
                        )}
                    </Stack>
                )}

                <Stack alignItems="flex-start" mt={4} width="100%" spacing={4}>
                    <Typography variant="h6" marginBottom={0}>
                        Descrição da política de cancelamento
                    </Typography>

                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        inputProps={{ maxLength: 650 }}
                        label="Descrição dinâmica (exibida para o hóspede)"
                        variant="outlined"
                        {...getFieldProps('dynamicDescription')}
                    />

                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        inputProps={{ maxLength: 650 }}
                        label="Demais regras e observações"
                        variant="outlined"
                        {...getFieldProps('otherDescription')}
                    />
                </Stack>
            </Stack>
        </Form>
    )
}
