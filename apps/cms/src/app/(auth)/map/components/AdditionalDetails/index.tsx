import { useGetReservationById } from '@booksuite/sdk'
import { Box, Divider, Stack, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'

interface AdditionalDetailsProps {
    reservationId: string
    companyId: string
}
export const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
    reservationId,
    companyId,
}) => {
    const { data: reservation } = useGetReservationById(
        {
            id: reservationId,
            companyId: companyId,
        },
        {
            query: {
                enabled: !!reservationId,
            },
        },
    )

    if (!reservation) return null
    return (
        <Box
            sx={{
                bgcolor: 'white',
                borderRadius: 1,
                p: 3,
            }}
        >
            <Typography fontWeight={600} mb={1} color="blueGrey.800">
                Detalhes adicionais
            </Typography>
            <Divider sx={{ borderBottomWidth: '2px' }} />
            <Stack spacing={2} mt={2}>
                <TextField
                    label="Canal de Venda"
                    value={reservation.saleChannel || ''}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label="Vendedor"
                    value={reservation.sellerUser?.firstName || ''}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label="Observações (uso interno)"
                    value={reservation.notes || ''}
                    size="small"
                    fullWidth
                    multiline
                    minRows={4}
                    InputProps={{ readOnly: true }}
                />
                <Stack gap={1}>
                    {/* <Stack
                  direction="row"
                  gap={2}
                  justifyContent="space-between"
              >
                  <Typography
                      fontWeight={500}
                      color="blueGrey.500"
                  >
                      Cupom
                  </Typography>
                  <Typography color="blueGrey.700">
                      {reservation?.couponCode}
                  </Typography>
              </Stack> */}
                    <Stack
                        direction="row"
                        gap={2}
                        justifyContent="space-between"
                    >
                        <Typography fontWeight={500} color="blueGrey.500">
                            Data de criação
                        </Typography>
                        <Typography color="blueGrey.700">
                            {dayjs(reservation.createdAt).format('DD/MM/YYYY')}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        gap={2}
                        justifyContent="space-between"
                    >
                        <Typography fontWeight={500} color="blueGrey.500">
                            Última modificação
                        </Typography>
                        <Typography color="blueGrey.700">
                            {dayjs(reservation.updatedAt).format('DD/MM/YYYY')}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack width="100%" alignItems="flex-end">
                    <Link href="#" color="blueGrey.500">
                        <Typography fontWeight={500} color="blueGrey.500">
                            Ver histórico
                        </Typography>
                    </Link>
                </Stack>
            </Stack>
        </Box>
    )
}
