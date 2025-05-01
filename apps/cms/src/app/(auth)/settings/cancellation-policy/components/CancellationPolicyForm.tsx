import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { FieldArray, useFormikContext } from 'formik'
import { CirclePlus, Trash } from 'lucide-react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { CancellationPolicyFormData } from '../utils/config'
import { DEFAULT_PENALTY_OPTIONS } from '../utils/constants'

export const CancellationPolicyForm = () => {
    const { getFieldProps, values, setFieldValue, errors } =
        useFormikContext<CancellationPolicyFormData>()

    return (
        <FormContainer>
            <FormSection>
                <Stack direction="row" spacing={2} alignItems="center">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.applyCancellationTax === true}
                                onChange={(e) =>
                                    setFieldValue(
                                        'applyCancellationTax',
                                        e.target.checked,
                                    )
                                }
                            />
                        }
                        label="Aplicar taxa de cancelamento"
                    />
                </Stack>
            </FormSection>

            {values.applyCancellationTax === true && (
                <FormSection>
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

                    <Stack width={'100%'} spacing={2}>
                        <NumberInput
                            label={
                                DEFAULT_PENALTY_OPTIONS.find(
                                    (option) =>
                                        option.value ===
                                        values.defaultPenaltyBy,
                                )?.label || 'Valor padrão (%)'
                            }
                            value={values.defaultValue}
                            min={1}
                            onChange={(e) => {
                                const newValueNumber = Number(e.target.value)
                                if (Number.isNaN(newValueNumber)) return
                                setFieldValue('defaultValue', newValueNumber)
                            }}
                            disabled={
                                values.defaultPenaltyBy === 'FIRST_NIGHT_AMOUNT'
                            }
                        />

                        <NumberInput
                            label="Período de desistência (dias)"
                            value={values.withdrawalPeriod}
                            min={1}
                            onChange={(e) => {
                                const newValueNumber = Number(e.target.value)
                                if (Number.isNaN(newValueNumber)) return
                                setFieldValue(
                                    'withdrawalPeriod',
                                    newValueNumber,
                                )
                            }}
                        />
                    </Stack>

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
                            aplicada sempre que uma reserva for cancelada após o{' '}
                            <strong>período de arrependimento</strong> da compra
                            de acordo com o CDC (código de defesa do consumidor
                            - artigo 49).
                            <br />
                            <br />
                            <strong>
                                Dentro do período de desistência é reembolsado
                                100% do valor pago.
                            </strong>
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mt={4}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={
                                        values.extraCancellationTax === true
                                    }
                                    onChange={(e) =>
                                        setFieldValue(
                                            'extraCancellationTax',
                                            e.target.checked,
                                        )
                                    }
                                />
                            }
                            label="Aplicar taxas de penalização personalizadas"
                        />
                    </Stack>

                    <FormSection>
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
                                                                    '500',
                                                                fontSize:
                                                                    '20px',
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

                                                    <NumberInput
                                                        label="Dias antes do check-in"
                                                        value={
                                                            penalty.daysBeforeCheckIn ||
                                                            1
                                                        }
                                                        min={1}
                                                        onChange={(e) => {
                                                            const newValueNumber =
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            if (
                                                                Number.isNaN(
                                                                    newValueNumber,
                                                                )
                                                            )
                                                                return
                                                            setFieldValue(
                                                                `penaltyRanges.${index}.daysBeforeCheckIn`,
                                                                newValueNumber,
                                                            )
                                                        }}
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

                                                    <NumberInput
                                                        label={
                                                            DEFAULT_PENALTY_OPTIONS.find(
                                                                (option) =>
                                                                    option.value ===
                                                                    penalty.penaltyBy,
                                                            )?.label ||
                                                            'Valor padrão (%)'
                                                        }
                                                        value={
                                                            penalty.value || 1
                                                        }
                                                        min={1}
                                                        max={100}
                                                        onChange={(e) => {
                                                            const newValueNumber =
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            if (
                                                                Number.isNaN(
                                                                    newValueNumber,
                                                                )
                                                            )
                                                                return
                                                            setFieldValue(
                                                                `penaltyRanges.${index}.value`,
                                                                newValueNumber,
                                                            )
                                                        }}
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
                    </FormSection>
                </FormSection>
            )}

            <FormSection title="Descrição da política de cancelamento">
                <TextField
                    multiline
                    rows={4}
                    label="Descrição dinâmica (exibida para o hóspede)"
                    error={!!errors.dynamicDescription}
                    helperText={errors.dynamicDescription}
                    {...getFieldProps('dynamicDescription')}
                />

                <TextField
                    multiline
                    rows={4}
                    label="Demais regras e observações"
                    error={!!errors.otherDescription}
                    helperText={errors.otherDescription}
                    {...getFieldProps('otherDescription')}
                />
            </FormSection>
        </FormContainer>
    )
}
