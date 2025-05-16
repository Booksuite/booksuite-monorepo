import { useCalculatePriceFromHousingUnitTypeId } from '@booksuite/sdk'
import {
    Box,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { useFormikContext } from 'formik'
import React from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { themeOptions } from '@/common/theme'
import { formatCurrency } from '@/common/utils/currency'
import {
    ReservationFormData,
    transformAgeGroupObjToArray,
} from '../../utils/config'

const ReservationSummary = () => {
    const { values } = useFormikContext<ReservationFormData>()
    const companyId = useCurrentCompanyId()

    const { data: housingUnitType, isFetching } =
        useCalculatePriceFromHousingUnitTypeId(
            {
                companyId,
                housingUnitTypeId: values.summary?.housingUnitType.id || '',
            },
            {
                currentDate: dayjs.utc().format('YYYY-MM-DD'),
                search: {
                    dateRange: {
                        start: values.startDate,
                        end: values.endDate,
                    },
                    adults: values.adults,
                    ageGroups: transformAgeGroupObjToArray(values.ageGroups),
                    rateOptionId:
                        values.summary?.summary.rateOption?.id || undefined,
                    services: values.services.map((service) => ({
                        serviceId: service.service.id,
                        quantity: service.quantity,
                    })),
                },
            },
            {
                query: {
                    enabled: !!values.summary?.housingUnitType.id,
                },
            },
        )

    const rateOptionPrice = housingUnitType?.summary.rateOptionPrice ?? 0
    const servicesPrice = housingUnitType?.summary.servicesPrice ?? 0
    const childrenPrice = housingUnitType?.summary.childrenPrice ?? 0

    const additionsTotal = servicesPrice

    const totalReceived = 0 // TODO: get total received

    const offerAmount = housingUnitType?.summary.offerAmount ?? 0
    const basePrice = housingUnitType?.summary.basePrice ?? 0
    const finalPrice = housingUnitType?.summary.finalPrice ?? 0

    const totalStay = basePrice + rateOptionPrice + childrenPrice

    const discounts = 0

    const openAmount = finalPrice - totalReceived

    const rows = [
        { label: 'Total das diárias', value: formatCurrency(totalStay) },
        { label: 'Total de adicionais', value: formatCurrency(additionsTotal) },
        { label: 'Ofertas', value: formatCurrency(offerAmount) },
        { label: 'Descontos', value: formatCurrency(discounts) },
        { label: 'Devoluções', value: formatCurrency(0) },
        { label: 'Acréscimo', value: formatCurrency(0) },
        { label: 'Taxas', value: formatCurrency(0) },
        { label: 'Total da reserva', value: formatCurrency(finalPrice) },
        { label: 'Total recebido', value: formatCurrency(totalReceived) },
    ]

    return (
        <Paper
            sx={{
                borderRadius: 1,
                overflow: 'hidden',
                height: 'fit-content',
                position: 'sticky',
                top: -40,
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                px={6}
                py={3}
                bgcolor={themeOptions.palette?.blueGrey?.[100]}
            >
                <Stack direction="row" gap={2}>
                    <Typography variant="subtitle1" fontWeight="600">
                        Resumo da reserva
                    </Typography>
                    {isFetching && (
                        <CircularProgress size={20} color="primary" />
                    )}
                </Stack>
                <Typography variant="subtitle1">Valor</Typography>
            </Stack>

            <Box px={6} py={2}>
                <Table>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        fontWeight: 'normal',
                                        borderBottom: 'none',
                                        paddingY: 1,
                                        px: 0,
                                    }}
                                >
                                    {row.label}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontWeight: 'normal',
                                        borderBottom: 'none',
                                        paddingY: 1,
                                        px: 0,
                                    }}
                                >
                                    {row.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between" px={6} py={3}>
                <Typography>Em aberto</Typography>
                <Typography>{formatCurrency(openAmount)}</Typography>
            </Stack>
        </Paper>
    )
}

export default ReservationSummary
