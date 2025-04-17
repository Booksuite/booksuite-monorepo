import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { FieldArray, useFormikContext } from 'formik'
import { CirclePlus, Info, Trash } from 'lucide-react'

import { theme } from '@/common/theme'
import { formatCurrency } from '@/common/utils/currency'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { AgePolicyFormData } from '../utils/config'
import { AGE_GROUP_CHARGE_TYPE } from '../utils/constants'

export const AgePolicyForm = () => {
    const { touched, errors, values, setFieldValue } =
        useFormikContext<AgePolicyFormData>()

    return (
        <FormContainer>
            <FormSection title="Adultos">
                <NumberInput
                    label="Idade inicial para adultos"
                    value={values.adultMinAge}
                    onChange={(e) => {
                        const newValueNumber = Number(e.target.value)
                        if (Number.isNaN(newValueNumber)) return
                        setFieldValue('adultMinAge', newValueNumber)
                    }}
                />
                <Box
                    bgcolor={'grey.100'}
                    p={4}
                    borderRadius={1}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Info color={theme.palette.blue[900]} />
                        <Typography variant="body1" color={'blue.900'}>
                            <b>Importante:</b> selecione acima qual idade o
                            sistema deve considerar adulto (cobrando valor
                            integral).
                        </Typography>
                    </Box>
                </Box>
            </FormSection>

            <FormSection title="Crianças">
                <FormControlLabel
                    control={
                        <Switch
                            checked={values.acceptChildren}
                            onChange={(e) =>
                                setFieldValue(
                                    'acceptChildren',
                                    e.target.checked,
                                )
                            }
                        />
                    }
                    label="Aceitar Crianças"
                />
            </FormSection>

            <FormSection>
                {values.acceptChildren && (
                    <FieldArray name="ageGroups">
                        {({ push, remove }) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 3,
                                }}
                            >
                                {values.ageGroups.map((ageGroup, index) => {
                                    const error =
                                        typeof errors.ageGroups?.[index] ===
                                        'object'
                                            ? errors.ageGroups[index]
                                            : undefined

                                    const prevFinalAge =
                                        values.ageGroups[index - 1]?.finalAge ??
                                        -1

                                    const nextInitialAge =
                                        values.ageGroups[index + 1]
                                            ?.initialAge ?? values.adultMinAge

                                    return (
                                        <Box key={index} sx={{ mb: 3 }}>
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                gap={1}
                                                mb={2}
                                            >
                                                <Typography fontWeight={400}>
                                                    Faixa Etária - Crianças{' '}
                                                    {index + 1}
                                                </Typography>
                                                <IconButton
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    aria-label="Remove"
                                                    color="error"
                                                >
                                                    <Trash />
                                                </IconButton>
                                            </Box>
                                            <Grid
                                                container
                                                rowSpacing={4}
                                                columnSpacing={{
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 3,
                                                }}
                                            >
                                                <Grid size={6}>
                                                    <Stack width={'100%'}>
                                                        <NumberInput
                                                            label="Idade Inicial"
                                                            value={
                                                                ageGroup.initialAge
                                                            }
                                                            min={
                                                                prevFinalAge + 1
                                                            }
                                                            max={
                                                                ageGroup.finalAge -
                                                                1
                                                            }
                                                            onChange={(e) => {
                                                                const newValueNumber =
                                                                    Number(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                if (
                                                                    !Number.isNaN(
                                                                        newValueNumber,
                                                                    ) &&
                                                                    newValueNumber >=
                                                                        0
                                                                ) {
                                                                    const updated =
                                                                        values.ageGroups.map(
                                                                            (
                                                                                group,
                                                                                i,
                                                                            ) =>
                                                                                i ===
                                                                                index
                                                                                    ? {
                                                                                          ...group,
                                                                                          initialAge:
                                                                                              newValueNumber,
                                                                                      }
                                                                                    : group,
                                                                        )
                                                                    setFieldValue(
                                                                        'ageGroups',
                                                                        updated,
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid size={6}>
                                                    <Stack width={'100%'}>
                                                        <NumberInput
                                                            label="Idade Final"
                                                            value={
                                                                ageGroup.finalAge
                                                            }
                                                            min={
                                                                ageGroup.initialAge +
                                                                1
                                                            }
                                                            max={
                                                                nextInitialAge -
                                                                1
                                                            }
                                                            onChange={(e) => {
                                                                const newValueNumber =
                                                                    Number(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                if (
                                                                    !Number.isNaN(
                                                                        newValueNumber,
                                                                    ) &&
                                                                    newValueNumber >=
                                                                        0
                                                                ) {
                                                                    const updated =
                                                                        values.ageGroups.map(
                                                                            (
                                                                                group,
                                                                                i,
                                                                            ) =>
                                                                                i ===
                                                                                index
                                                                                    ? {
                                                                                          ...group,
                                                                                          finalAge:
                                                                                              newValueNumber,
                                                                                      }
                                                                                    : group,
                                                                        )
                                                                    setFieldValue(
                                                                        'ageGroups',
                                                                        updated,
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid size={6}>
                                                    <FormControl
                                                        fullWidth
                                                        error={
                                                            !!error?.chargeType &&
                                                            touched
                                                                ?.ageGroups?.[
                                                                index
                                                            ]?.chargeType
                                                        }
                                                    >
                                                        <TextField
                                                            select
                                                            label="Tipo de cobrança"
                                                            value={
                                                                ageGroup.chargeType ||
                                                                ''
                                                            }
                                                            onChange={(
                                                                event,
                                                            ) => {
                                                                const updated =
                                                                    values.ageGroups.map(
                                                                        (
                                                                            group,
                                                                            i,
                                                                        ) =>
                                                                            i ===
                                                                            index
                                                                                ? {
                                                                                      ...group,
                                                                                      chargeType:
                                                                                          event
                                                                                              .target
                                                                                              .value,
                                                                                  }
                                                                                : group,
                                                                    )
                                                                setFieldValue(
                                                                    'ageGroups',
                                                                    updated,
                                                                )
                                                            }}
                                                        >
                                                            {Object.entries(
                                                                AGE_GROUP_CHARGE_TYPE,
                                                            ).map(
                                                                ([
                                                                    value,
                                                                    label,
                                                                ]) => (
                                                                    <MenuItem
                                                                        key={
                                                                            value
                                                                        }
                                                                        value={
                                                                            value
                                                                        }
                                                                    >
                                                                        {label}
                                                                    </MenuItem>
                                                                ),
                                                            )}
                                                        </TextField>

                                                        {error?.chargeType &&
                                                            touched
                                                                ?.ageGroups?.[
                                                                index
                                                            ]?.chargeType && (
                                                                <FormHelperText>
                                                                    {
                                                                        error.chargeType
                                                                    }
                                                                </FormHelperText>
                                                            )}
                                                    </FormControl>
                                                </Grid>

                                                {ageGroup.chargeType !==
                                                    'FREE' && (
                                                    <Grid size={6}>
                                                        <TextField
                                                            label={
                                                                ageGroup.chargeType ===
                                                                'DAILY_PERCENTAGE_PER_CHILDREN'
                                                                    ? 'Percentual a ser cobrado'
                                                                    : 'Valor a ser cobrado'
                                                            }
                                                            fullWidth
                                                            value={
                                                                ageGroup.chargeType ===
                                                                'DAILY_PERCENTAGE_PER_CHILDREN'
                                                                    ? (ageGroup.value ??
                                                                      '')
                                                                    : formatCurrency(
                                                                          Number(
                                                                              ageGroup.value ||
                                                                                  0,
                                                                          ),
                                                                      )
                                                            }
                                                            error={
                                                                !!error?.value &&
                                                                touched
                                                                    ?.ageGroups?.[
                                                                    index
                                                                ]?.value
                                                            }
                                                            helperText={
                                                                error?.value &&
                                                                touched
                                                                    ?.ageGroups?.[
                                                                    index
                                                                ]?.value
                                                                    ? error.value
                                                                    : ''
                                                            }
                                                            onChange={(e) => {
                                                                let newValue =
                                                                    e.target
                                                                        .value

                                                                if (
                                                                    ageGroup.chargeType ===
                                                                    'DAILY_PERCENTAGE_PER_CHILDREN'
                                                                ) {
                                                                    newValue =
                                                                        String(
                                                                            Math.max(
                                                                                0,
                                                                                Math.min(
                                                                                    100,
                                                                                    Number(
                                                                                        newValue,
                                                                                    ),
                                                                                ),
                                                                            ),
                                                                        )
                                                                } else {
                                                                    const raw =
                                                                        newValue.replace(
                                                                            /\D/g,
                                                                            '',
                                                                        )
                                                                    newValue =
                                                                        String(
                                                                            Number(
                                                                                raw,
                                                                            ) /
                                                                                100,
                                                                        )
                                                                }

                                                                const updated =
                                                                    values.ageGroups.map(
                                                                        (
                                                                            group,
                                                                            i,
                                                                        ) =>
                                                                            i ===
                                                                            index
                                                                                ? {
                                                                                      ...group,
                                                                                      value: newValue,
                                                                                  }
                                                                                : group,
                                                                    )
                                                                setFieldValue(
                                                                    'ageGroups',
                                                                    updated,
                                                                )
                                                            }}
                                                            InputProps={{
                                                                startAdornment:
                                                                    ageGroup.chargeType ===
                                                                    'DAILY_PERCENTAGE_PER_CHILDREN' ? (
                                                                        <InputAdornment position="start">
                                                                            %
                                                                        </InputAdornment>
                                                                    ) : null,
                                                            }}
                                                        />
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Box>
                                    )
                                })}
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<CirclePlus size={16} />}
                                    sx={{ mt: 2, mb: 2 }}
                                    size="large"
                                    onClick={() => {
                                        const last =
                                            values.ageGroups[
                                                values.ageGroups.length - 1
                                            ]
                                        const newInitial = last
                                            ? last.finalAge + 1
                                            : 0
                                        const newFinal = newInitial + 1

                                        push({
                                            initialAge: newInitial,
                                            finalAge: newFinal,
                                            value: 0,
                                            chargeType: '',
                                        })
                                    }}
                                >
                                    Adicionar Faixa Etária
                                </Button>
                            </Box>
                        )}
                    </FieldArray>
                )}
            </FormSection>
        </FormContainer>
    )
}
