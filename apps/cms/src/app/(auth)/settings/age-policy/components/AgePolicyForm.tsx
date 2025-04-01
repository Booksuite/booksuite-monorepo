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
import { FieldArray, Form, useFormikContext } from 'formik'
import { CirclePlus, Info, Trash } from 'lucide-react'

import { NumberInput } from '@/components/atoms/NumberInput'
import { AgePolicyFormData } from '../utils/config'
import { AGE_GROUP_CHARGE_TYPE } from '../utils/constants'

export const AgePolicyForm = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<AgePolicyFormData>()

    return (
        <Form>
            <Stack spacing={4} mt={2}>
                <Stack spacing={2}>
                    <Typography variant="h6">Adultos</Typography>
                    <NumberInput
                        label="Idade inicial para adultos"
                        error={errors.adultMinAge}
                        formControl={{
                            isInvalid:
                                !!errors.adultMinAge && touched.adultMinAge,
                        }}
                        {...getFieldProps('adultMinAge')}
                        onChange={handleChange('adultMinAge')}
                    />
                    <Box
                        bgcolor={'grey.100'}
                        p={2}
                        borderRadius={1}
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Box display="flex" alignItems="center" gap={1}>
                            <Info size={23} color={'#0B1F51'} />
                            <Typography variant="body1" color={'#0B1F51'}>
                                <b>Importante:</b> selecione acima qual idade o
                                sistema deve considerar adulto (cobrando valor
                                integral).
                            </Typography>
                        </Box>
                    </Box>
                </Stack>

                <Stack gap={2} mt={2}>
                    <Typography variant="h6">Crianças</Typography>
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
                </Stack>

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
                                {values.ageGroups.map((_, index) => {
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
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    fontWeight={400}
                                                >
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
                                                rowSpacing={1}
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
                                                            error={
                                                                error?.initialAge
                                                            }
                                                            formControl={{
                                                                isInvalid:
                                                                    !!error?.initialAge &&
                                                                    touched
                                                                        .ageGroups?.[
                                                                        index
                                                                    ]
                                                                        ?.initialAge,
                                                            }}
                                                            {...getFieldProps(
                                                                `ageGroups.${index}.initialAge`,
                                                            )}
                                                            onChange={handleChange(
                                                                `ageGroups.${index}.initialAge`,
                                                            )}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid size={6}>
                                                    <Stack width={'100%'}>
                                                        <NumberInput
                                                            label="Idade Final"
                                                            error={
                                                                error?.finalAge
                                                            }
                                                            formControl={{
                                                                isInvalid:
                                                                    !!error?.finalAge &&
                                                                    touched
                                                                        .ageGroups?.[
                                                                        index
                                                                    ]?.finalAge,
                                                            }}
                                                            {...getFieldProps(
                                                                `ageGroups.${index}.finalAge`,
                                                            )}
                                                            onChange={handleChange(
                                                                `ageGroups.${index}.finalAge`,
                                                            )}
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
                                                                values
                                                                    .ageGroups?.[
                                                                    index
                                                                ]?.chargeType ||
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
                                                            variant="outlined"
                                                            style={{
                                                                border: '1px solid #D9E2EC',
                                                                borderRadius:
                                                                    '8px',
                                                                padding: '6px',
                                                                color: '#01337D',
                                                            }}
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
                                                {values.ageGroups[index]
                                                    ?.chargeType !== 'FREE' && (
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
                                                                getFieldProps(
                                                                    `ageGroups.${index}.value`,
                                                                ).value
                                                            }
                                                            onChange={handleChange(
                                                                `ageGroups.${index}.value`,
                                                            )}
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
            </Stack>
        </Form>
    )
}
