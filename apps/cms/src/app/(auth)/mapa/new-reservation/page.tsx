import { MenuItem, Stack, TextField } from '@mui/material'

import { PageHeader } from '@/components/organisms/PageHeader'

import ReservationSummary from './components/ReservationSummary'
import { RESERVATION_OPTIONS } from './utils/constants'

export default function NewReservation() {
    return (
        <>
            <PageHeader
                title="Nova Reserva"
                backLButtonLabel="Mapa"
                backButtonHref="/mapa"
            />

            <Stack display={'flex'} flexDirection={'row'} gap={7}>
                <Stack width={'100%'}>
                    <TextField select label="Tipo de Variação do Preço">
                        {RESERVATION_OPTIONS.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <ReservationSummary />
            </Stack>
        </>
    )
}
