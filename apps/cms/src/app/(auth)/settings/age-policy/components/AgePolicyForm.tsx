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
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { FieldArray, useFormikContext } from 'formik'
import { CirclePlus, Info, Trash } from 'lucide-react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { AgePolicyFormData } from '../utils/config'
import { AGE_GROUP_CHARGE_TYPE } from '../utils/constants'
import { theme } from '@/common/theme'

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
                                                            min={0}
                                                            max={
                                                                values.adultMinAge -
                                                                2
                                                            }
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
                                                                    `ageGroups.${index}.initialAge`,
                                                                    newValueNumber,
                                                                )
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
                                                                values.adultMinAge -
                                                                1
                                                            }
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
                                                                    `ageGroups.${index}.finalAge`,
                                                                    newValueNumber,
                                                                )
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
                                                        <Select
                                                            value={
                                                                ageGroup.chargeType ||
                                                                ''
                                                            }
                                                            onChange={(event) =>
                                                                setFieldValue(
                                                                    `ageGroups.${index}.chargeType`,
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            displayEmpty
                                                        >
                                                            <MenuItem
                                                                value=""
                                                                disabled
                                                            >
                                                                Tipo de Cobrança
                                                            </MenuItem>
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
                                                        </Select>
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
                                                            label="Valor a ser cobrado"
                                                            type="text"
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
                                                            value={
                                                                ageGroup.value
                                                            }
                                                            onChange={(e) => {
                                                                const newValue =
                                                                    e.target
                                                                        .value
                                                                setFieldValue(
                                                                    `ageGroups.${index}.value`,
                                                                    newValue,
                                                                )
                                                            }}
                                                            fullWidth
                                                            variant="outlined"
                                                            InputProps={{
                                                                startAdornment:
                                                                    (
                                                                        <InputAdornment position="start">
                                                                            R$
                                                                        </InputAdornment>
                                                                    ),
                                                                inputMode:
                                                                    'numeric',
                                                                inputProps: {
                                                                    pattern:
                                                                        '[0-9]*',
                                                                },
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
                                    onClick={() =>
                                        push({
                                            initialAge: 0,
                                            finalAge: 0,
                                            value: 0,
                                            chargeType: '',
                                        })
                                    }
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
