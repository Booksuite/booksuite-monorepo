import {
    Box,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material'
import { useFormikContext } from 'formik'
import React from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { themeOptions } from '@/common/theme'
import { formatCurrency } from '@/common/utils/currency'
import {
    ReservationFormData,
    useCompanyHousingUnitTypes,
    useCompanyReservationOptions,
    useCompanyServices,
} from '../../utils/config'

const ReservationSummary = () => {
    const { values } = useFormikContext<ReservationFormData>()
    const companyId = useCurrentCompanyId()

    const { data: housingUnitTypes } = useCompanyHousingUnitTypes(companyId)
    const { data: reservationOptions } = useCompanyReservationOptions(
        companyId,
        values.startDate,
        values.endDate,
    )
    const { data: services } = useCompanyServices(companyId, false)

    const selectedHousingUnitType = housingUnitTypes?.items.find((type) =>
        type.housingUnits.some((unit) => unit.id === values.housingUnitId),
    )

    const calculateDailyTotal = () => {
        if (!selectedHousingUnitType || !values.startDate || !values.endDate)
            return 0

        const start = new Date(values.startDate)
        const end = new Date(values.endDate)

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
            return 0
        }

        const days = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        )
        return (selectedHousingUnitType.weekdaysPrice ?? 0) * (days || 1)
    }

    const calculateAdditionsTotal = () => {
        if (!values.services || !services?.items) return 0

        return values.services.reduce((total, service) => {
            const serviceDetails = services.items.find(
                (s) => s.id === service.serviceId,
            )
            return total + (serviceDetails?.price || 0) * service.qtd
        }, 0)
    }

    const calculateOptionsTotal = () => {
        if (!values.reservationOptions || !reservationOptions?.items) return 0

        const totalChildrens = values.children
            ? values.children.reduce((sum, c) => sum + Number(c.children), 0)
            : 0

        return values.reservationOptions.reduce((total, optionId) => {
            const option = reservationOptions.items.find(
                (opt) => opt.id === optionId,
            )
            if (!option) return total

            const optionAdultPrice = values.adults
                ? values.adults * option.additionalAdultPrice
                : 0
            const optionChildrenPrice =
                totalChildrens * option.additionalChildrenPrice

            return total + optionAdultPrice + optionChildrenPrice
        }, 0)
    }

    const dailyTotal = calculateDailyTotal()
    const additionsTotal = calculateAdditionsTotal() + calculateOptionsTotal()
    const reservationTotal = dailyTotal + additionsTotal
    const receivedTotal = 0
    const openAmount = reservationTotal - receivedTotal

    const rows = [
        { label: 'Total das diárias', value: formatCurrency(dailyTotal) },
        { label: 'Total de adicionais', value: formatCurrency(additionsTotal) },
        { label: 'Descontos', value: formatCurrency(0) },
        { label: 'Devoluções', value: formatCurrency(0) },
        { label: 'Acréscimo', value: formatCurrency(0) },
        { label: 'Taxas', value: formatCurrency(0) },
        { label: 'Total da reserva', value: formatCurrency(reservationTotal) },
        { label: 'Total recebido', value: formatCurrency(receivedTotal) },
    ]

    const finalRow = {
        label: 'Em aberto',
        value: formatCurrency(openAmount),
        isBold: true,
    }

    return (
        <Paper
            sx={{
                p: 0,
                borderRadius: 1,
                width: '100%',
                maxWidth: 400,
                overflow: 'hidden',
                maxHeight: 400,
                position: 'sticky',
                top: 40,
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                px={6}
                py={3}
                bgcolor={themeOptions.palette?.blueGrey?.[100]}
                height={50}
            >
                <Typography variant="subtitle1" fontWeight="600">
                    Resumo da reserva
                </Typography>
                <Typography variant="subtitle1">Valor</Typography>
            </Box>

            <Box px={3} pt={2} pb={1}>
                <Table size="small">
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        fontWeight: 'normal',
                                        borderBottom: 'none',
                                        paddingY: 2,
                                    }}
                                >
                                    {row.label}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontWeight: 'normal',
                                        borderBottom: 'none',
                                        paddingY: 2,
                                    }}
                                >
                                    {row.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Divider sx={{ my: 1 }} />

                <Box
                    display="flex"
                    justifyContent="space-between"
                    py={1}
                    px={2}
                >
                    <Typography>{finalRow.label}</Typography>
                    <Typography>{finalRow.value}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default ReservationSummary
