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
import { ReservationFormData, useCompanyServices } from '../../utils/config'

const ReservationSummary = () => {
    const { values } = useFormikContext<ReservationFormData>()
    const companyId = useCurrentCompanyId()

    const { data: services } = useCompanyServices(companyId, false)

    const dailyTotal =
        values.summary.dailyTotal + values.summary.rateOption.price
    const additionsTotal = values.services.reduce((total, service) => {
        const serviceDetails = services?.items.find(
            (s) => s.id === service.serviceId,
        )
        return total + (serviceDetails?.price || 0) * service.quantity
    }, 0)
    const reservationTotal = dailyTotal + additionsTotal
    const totalReceived = values.summary.totalReceived
    const openAmount = reservationTotal - totalReceived

    const rows = [
        { label: 'Total das diárias', value: formatCurrency(dailyTotal) },
        { label: 'Total de adicionais', value: formatCurrency(additionsTotal) },
        { label: 'Descontos', value: formatCurrency(0) },
        { label: 'Devoluções', value: formatCurrency(0) },
        { label: 'Acréscimo', value: formatCurrency(0) },
        { label: 'Taxas', value: formatCurrency(0) },
        { label: 'Total da reserva', value: formatCurrency(reservationTotal) },
        { label: 'Total recebido', value: formatCurrency(totalReceived) },
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
