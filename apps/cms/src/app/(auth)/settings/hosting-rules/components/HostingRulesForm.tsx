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
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'
import dayjs from 'dayjs'
import { useFormikContext } from 'formik'
import { Info, PlusCircle, Trash } from 'lucide-react'
import { useState } from 'react'

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

    const getPeriodFromDays = (days: number | null) => {
        switch (days) {
            case 90:
                return 0
            case 180:
                return 1
            case 365:
                return 2
            case 730:
                return 3
            default:
                return 4
        }
    }

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
                return 0
        }
    }

    const [selectedOpening, setSelectedOpening] = useState<number | null>(
        values.reservationWindowStart && values.reservationWindowEnd ? 1 : 0,
    )
    const [selectedPeriods, setSelectedPeriods] = useState<number | null>(
        PERIODS.every((period) => period.days !== values.fixedWindowPeriod)
            ? 4
            : getPeriodFromDays(values.fixedWindowPeriod),
    )
    const [selectedSpecificDays, setSelectedSpecificDays] = useState<
        number | null
    >(values.availableWeekDays.length < 7 ? 1 : 0)

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

    // useEffect(() => {
    //     if (values.reservationWindowStart && values.reservationWindowEnd) {
    //         setSelectedOpening(1)
    //     } else {
    //         setSelectedOpening(0)

    //         if (
    //             PERIODS.every(
    //                 (period) => period.days !== values.fixedWindowPeriod,
    //             )
    //         ) {
    //             setSelectedPeriods(4)
    //         } else {
    //             setSelectedPeriods(getPeriodFromDays(values.fixedWindowPeriod))
    //         }
    //     }
    // }, [values])

    return (
        <FormContainer>
            <FormSection>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                label="Horário do Check-In"
                                value={getFieldProps('checkIn').value}
                                onChange={(e) =>
                                    setFieldValue('checkIn', e.target.value)
                                }
                            >
                                {CHECKIN_OPTIONS.map(
                                    ({ label, value }, index) => (
                                        <MenuItem key={index} value={value}>
                                            {label}
                                        </MenuItem>
                                    ),
                                )}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid size={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                label="Horário do Check-Out"
                                value={getFieldProps('checkOut').value}
                                onChange={(e) =>
                                    setFieldValue('checkOut', e.target.value)
                                }
                            >
                                {CHECKOUT_OPTIONS.map(
                                    ({ label, value }, index) => (
                                        <MenuItem key={index} value={value}>
                                            {label}
                                        </MenuItem>
                                    ),
                                )}
                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>

                <NumberInput
                    label="Mínimo de diárias"
                    {...getFieldProps('minDaily')}
                    value={values.minDaily}
                    min={1}
                    onChange={(e) => {
                        const newValueNumber = Number(e.target.value)
                        if (Number.isNaN(newValueNumber)) return
                        setFieldValue('minDaily', newValueNumber)
                    }}
                />
            </FormSection>

            <FormSection title="Noites do fim de semana">
                <FormGroup>
                    <Grid container justifyContent={'space-between'}>
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
                    p={4}
                    borderRadius={2}
                    display="flex"
                    alignItems="center"
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Info color={theme.palette.blue[900]} />
                        <Typography variant="body2" color="blue.900">
                            <b>Atenção:</b> as noites não selecionadas serão
                            automaticamente consideradas dia de semana.
                        </Typography>
                    </Box>
                </Box>
            </FormSection>

            <FormSection title="Janela de Disponibilidade">
                <FormControl fullWidth>
                    <TextField
                        select
                        label="Janela de abertura de hospedagem"
                        value={selectedOpening}
                        onChange={(e) => {
                            setSelectedOpening(Number(e.target.value))

                            if (Number(e.target.value) == 1) {
                                setFieldValue('fixedWindowPeriod', 1)
                            } else {
                                setFieldValue('reservationWindowStart', null)
                                setFieldValue('reservationWindowEnd', null)
                            }
                        }}
                    >
                        {OPENING_WINDOW.map(({ label }, index) => (
                            <MenuItem key={index} value={index}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>

                {selectedOpening === 0 && (
                    <FormControl fullWidth>
                        <TextField
                            select
                            label="Períodos"
                            value={selectedPeriods}
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                setSelectedPeriods(value)

                                setFieldValue(
                                    'fixedWindowPeriod',
                                    getDaysForPeriod(value),
                                )
                                setFieldValue('reservationWindowStart', null)
                                setFieldValue('reservationWindowEnd', null)
                            }}
                        >
                            {PERIODS.map(({ label }, index) => (
                                <MenuItem key={index} value={index}>
                                    {label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                )}

                <NumberInput
                    label="Janela de abertura (dias)"
                    value={getFieldProps('fixedWindowPeriod').value}
                    disabled={selectedOpening == 1}
                    min={1}
                    onChange={(e) => {
                        if (selectedOpening != 1) {
                            if (
                                PERIODS.every(
                                    (period) =>
                                        period.days !== Number(e.target.value),
                                )
                            ) {
                                setSelectedPeriods(4)
                            }
                            setFieldValue(
                                'fixedWindowPeriod',
                                Number(e.target.value),
                            )
                        }
                    }}
                />

                <FormSection>
                    {selectedOpening === 1 &&
                        periods.map((period, index) => (
                            <Box key={period.id} width="100%">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Typography fontWeight={400}>
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
                                        <TextField
                                            label="Início da Janela de Venda"
                                            type="date"
                                            fullWidth
                                            value={
                                                values.reservationWindowStart ||
                                                ''
                                            }
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'reservationWindowStart',
                                                    e.target.value,
                                                )
                                            }}
                                            error={
                                                !!errors.reservationWindowStart
                                            }
                                            helperText={
                                                errors.reservationWindowStart
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <TextField
                                            label="Fim da Janela de Venda"
                                            type="date"
                                            fullWidth
                                            value={
                                                values.reservationWindowEnd ||
                                                ''
                                            }
                                            onChange={(e) => {
                                                if (
                                                    values.reservationWindowStart
                                                ) {
                                                    const start = dayjs(
                                                        values.reservationWindowStart,
                                                    )
                                                    const end = dayjs(
                                                        e.target.value,
                                                    )
                                                    const diffInDays = end.diff(
                                                        start,
                                                        'day',
                                                    )

                                                    if (diffInDays > 0)
                                                        setFieldValue(
                                                            'fixedWindowPeriod',
                                                            diffInDays,
                                                        )
                                                }

                                                setFieldValue(
                                                    'reservationWindowEnd',
                                                    e.target.value,
                                                )
                                            }}
                                            error={
                                                !!errors.reservationWindowEnd
                                            }
                                            helperText={
                                                errors.reservationWindowEnd
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                </FormSection>

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
                    <FormControl fullWidth>
                        <TextField
                            select
                            label="Dias de funcionamento"
                            value={selectedSpecificDays}
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                setSelectedSpecificDays(value)
                                if (value == 0)
                                    setFieldValue(
                                        'availableWeekDays',
                                        [0, 1, 2, 3, 4, 5, 6],
                                    )
                            }}
                        >
                            {SPECIFIC_DAYS.map(({ label }, index) => (
                                <MenuItem key={index} value={index}>
                                    {label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </FormControl>

                {selectedSpecificDays === 1 && (
                    <FormGroup>
                        <Grid container justifyContent={'space-between'}>
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
