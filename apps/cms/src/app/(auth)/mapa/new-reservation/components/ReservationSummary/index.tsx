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
import React from 'react'

import { themeOptions } from '@/common/theme'

const ReservationSummary = () => {
    const rows = [
        { label: 'Total das diárias', value: 'R$ 5.670,00' },
        { label: 'Total de adicionais', value: 'R$ 2.193,00' },
        { label: 'Descontos', value: 'R$ 0,00' },
        { label: 'Devoluções', value: 'R$ 0,00' },
        { label: 'Acréscimo', value: 'R$ 0,00' },
        { label: 'Taxas', value: 'R$ 0,00' },
        { label: 'Total da reserva', value: 'R$ 7.863,00' },
        { label: 'Total recebido', value: 'R$ 0,00' },
    ]

    const finalRow = { label: 'Em aberto', value: 'R$ 7.863,00', isBold: true }

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
