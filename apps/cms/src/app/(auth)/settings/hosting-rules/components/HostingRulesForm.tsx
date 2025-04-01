import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Typography,
    useTheme,
} from '@mui/material'
import { useFormikContext } from 'formik'
import { Info, PlusCircle, Trash } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'

import { DatePickerBox } from '@/components/atoms/DatePickerBox'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { HostingRulesData } from '../utils/config'
import {
    AVAILABLE_WEEK_DAYS,
    CHECKIN_OPTIONS,
    CHECKOUT_OPTIONS,
    HOSTING_SPECIFIC_DAYS,
    OPENING_WINDOW,
    PERIODS,
    SPECIFIC_DAYS,
} from '../utils/contants'

export const HostingRulesForm = () => {
    const theme = useTheme()
    const { getFieldProps, values, setFieldValue, errors } =
        useFormikContext<HostingRulesData>()

    const [selectedOpening, setSelectedOpening] = useState<number | null>(null)
    const [selectedPeriods, setSelectedPeriods] = useState<number | null>(null)
    const [selectedSpecificDays, setSelectedSpecificDays] = useState<
        number | null
    >(null)

    const getDaysForPeriod = (selectedPeriods: number | null) => {
        switch (selectedPeriods) {
            case 0:
                return 90
            case 1:
                return 180
            case 2:
                return 365
            case 3:
                return 730
            default:
                return ''
        }
    }

    const [periods, setPeriods] = useState([
        { id: 1, startDate: '', endDate: '' },
    ])

    const addPeriod = () => {
        setPeriods([
            ...periods,
            { id: periods.length + 1, startDate: '', endDate: '' },
        ])
    }

    const removePeriod = (id: number) => {
        setPeriods(periods.filter((period) => period.id !== id))
    }

    useEffect(() => {
        if (!getDaysForPeriod(values.fixedWindowPeriod)) {
            setSelectedOpening(0)
            setSelectedPeriods(4)
        }

        if (values.availableWeekDays.length < 7) setSelectedSpecificDays(1)

        if (values.reservationWindowStart) {
            setSelectedOpening(1)
        }

        const foundPeriod = PERIODS.find(
            (period) => period.days == values.fixedWindowPeriod,
        )
        setSelectedPeriods(foundPeriod?.days || 4)
    }, [])

    return (
        <FormContainer>
            <FormSection>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <FormControl fullWidth>
                            <Select
                                size="medium"
                                onChange={(
                                    e: ChangeEvent<{ value: unknown }>,
                                ) =>
                                    setFieldValue(
                                        'checkIn',
                                        Number(e.target.value),
                                    )
                                }
                                value={getFieldProps('checkIn').value}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Horário do Check-In
                                </MenuItem>
                                {CHECKIN_OPTIONS.map(
                                    ({ label, value }, index) => (
                                        <MenuItem key={index} value={value}>
                                            {label}
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={6}>
                        <FormControl fullWidth>
                            <Select
                                size="medium"
                                onChange={(
                                    e: ChangeEvent<{ value: unknown }>,
                                ) =>
                                    setFieldValue(
                                        'checkOut',
                                        Number(e.target.value),
                                    )
                                }
                                value={getFieldProps('checkOut').value}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Horário do Check-Out
                                </MenuItem>
                                {CHECKOUT_OPTIONS.map(
                                    ({ label, value }, index) => (
                                        <MenuItem key={index} value={value}>
                                            {label}
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <NumberInput
                    label="Mínimo de diárias"
                    {...getFieldProps('minDaily')}
                    onChange={(e) => setFieldValue('minDaily', e.target.value)}
                />
            </FormSection>

            <FormSection title="Noites do fim de semana">
                <FormGroup>
                    <Grid container spacing={2}>
                        {AVAILABLE_WEEK_DAYS.map((night) => (
                            <Grid key={night.name}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.availableWeekend.includes(
                                                night.value,
                                            )}
                                            onChange={(e) => {
                                                const newValue = e.target
                                                    .checked
                                                    ? [
                                                          ...values.availableWeekend,
                                                          night.value,
                                                      ]
                                                    : values.availableWeekend.filter(
                                                          (v) =>
                                                              v !== night.value,
                                                      )
                                                setFieldValue(
                                                    'availableWeekend',
                                                    newValue,
                                                )
                                            }}
                                        />
                                    }
                                    label={night.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </FormGroup>
                <Box
                    bgcolor="grey.100"
                    p={2}
                    borderRadius={4}
                    display="flex"
                    alignItems="center"
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Info size={20} color={theme.palette.primary.main} />
                        <Typography variant="body2" color="primary.dark">
                            <b>Atenção:</b> as noites não selecionadas serão
                            automaticamente consideradas dia de semana.
                        </Typography>
                    </Box>
                </Box>
            </FormSection>

            <FormSection title="Janela de Disponibilidade">
                <FormControl fullWidth>
                    <Select
                        value={selectedOpening || ''}
                        onChange={(e) => {
                            const value = Number(e.target.value)
                            setSelectedOpening(value)
                        }}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Selecione a janela de abertura de hospedagem
                        </MenuItem>
                        {OPENING_WINDOW.map(({ label }, index) => (
                            <MenuItem key={index} value={index}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedOpening === 0 && (
                    <FormControl fullWidth>
                        <Select
                            value={selectedPeriods || ''}
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                setSelectedPeriods(value)
                                setFieldValue('reservationWindowStart', null)
                                setFieldValue('reservationWindowEnd', null)
                            }}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Selecione o período
                            </MenuItem>
                            {PERIODS.map(({ label }, index) => (
                                <MenuItem key={index} value={index}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                <NumberInput
                    label="Janela de abertura (dias)"
                    value={getFieldProps('fixedWindowPeriod').value}
                    onChange={(e) => {
                        setFieldValue('fixedWindowPeriod', e.target.value)
                        if (selectedPeriods !== 4) {
                            setFieldValue(
                                'fixedWindowPeriod',
                                getDaysForPeriod(selectedPeriods),
                            )
                        }
                    }}
                />

                {selectedOpening === 1 &&
                    periods.map((period, index) => (
                        <Box key={period.id} width="100%">
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <Typography variant="h6" fontWeight={600}>
                                    Período de Hospedagem {index + 1}
                                </Typography>
                                <IconButton
                                    aria-label="Remover período"
                                    color="error"
                                    onClick={() => removePeriod(period.id)}
                                >
                                    <Trash size={20} />
                                </IconButton>
                            </Stack>
                            <Grid container spacing={2} mt={1}>
                                <Grid size={6}>
                                    <Typography variant="subtitle2">
                                        Início da Janela de Venda
                                    </Typography>
                                    <DatePickerBox
                                        value={values.reservationWindowStart}
                                        onChange={(date) =>
                                            setFieldValue(
                                                'reservationWindowStart',
                                                date,
                                            )
                                        }
                                        error={errors.reservationWindowStart}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <Typography variant="subtitle2">
                                        Fim da Janela de Venda
                                    </Typography>
                                    <DatePickerBox
                                        value={values.reservationWindowEnd}
                                        onChange={(date) =>
                                            setFieldValue(
                                                'reservationWindowEnd',
                                                date,
                                            )
                                        }
                                        error={errors.reservationWindowEnd}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}

                {selectedOpening === 1 && (
                    <Button
                        startIcon={<PlusCircle />}
                        variant="outlined"
                        color="primary"
                        onClick={addPeriod}
                        size="large"
                    >
                        Adicionar período
                    </Button>
                )}
            </FormSection>

            <FormSection>
                <FormControl fullWidth>
                    <Select
                        value={selectedSpecificDays || ''}
                        onChange={(e) => {
                            const value = Number(e.target.value)
                            setSelectedSpecificDays(value)
                            if (value == 0)
                                setFieldValue(
                                    'availableWeekDays',
                                    [0, 1, 2, 3, 4, 5, 6],
                                )
                        }}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Dias de Funcionamento
                        </MenuItem>
                        {SPECIFIC_DAYS.map(({ label }, index) => (
                            <MenuItem key={index} value={index}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedSpecificDays === 1 && (
                    <FormGroup>
                        <Grid container spacing={2}>
                            {HOSTING_SPECIFIC_DAYS.map((night) => (
                                <Grid key={night.name}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.availableWeekDays.includes(
                                                    night.value,
                                                )}
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? [
                                                              ...values.availableWeekDays,
                                                              night.value,
                                                          ]
                                                        : values.availableWeekDays.filter(
                                                              (v) =>
                                                                  v !==
                                                                  night.value,
                                                          )
                                                    setFieldValue(
                                                        'availableWeekDays',
                                                        newValue,
                                                    )
                                                }}
                                            />
                                        }
                                        label={night.name}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </FormGroup>
                )}
            </FormSection>
        </FormContainer>
    )
}
