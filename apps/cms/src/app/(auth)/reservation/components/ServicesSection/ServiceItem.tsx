import { ServiceFull } from '@booksuite/sdk'
import { Box, Stack, Typography } from '@mui/material'

import { BILLING_TYPE_MAPPING } from '@/common/constants/billingType'
import { formatCurrency } from '@/common/utils/currency'
import { Image } from '@/components/atoms/Image'
import { NumberInputBase } from '@/components/atoms/NumberInput/NumberInputBase'
import { calculateServicePrice } from '../../utils/helpers'

type ServiceItemProps = {
    service: ServiceFull
    totalAdults: number
    totalStay: number
    quantity: number
    handleUpdateServices: (service: ServiceFull, quantity: number) => void
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
    service,
    totalAdults,
    totalStay,
    quantity,
    handleUpdateServices,
}) => {
    const priceLabel = BILLING_TYPE_MAPPING[service.billingType]

    const imageSize = 60

    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 1,
                p: 3,
                mb: 2,
            }}
        >
            <Stack direction="row" gap={3}>
                <Stack direction="row" gap={3}>
                    {service.medias?.[0]?.media?.url && (
                        <Image
                            src={service.medias[0].media.url}
                            alt={service.name}
                            sx={{
                                width: imageSize,
                                height: imageSize,
                                borderRadius: 1,
                                objectFit: 'cover',
                            }}
                        />
                    )}
                    <Stack>
                        <Typography variant="body1" fontWeight={600}>
                            {service.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formatCurrency(service.price)} {priceLabel}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    flex={1}
                    alignItems="flex-end"
                    justifyContent="space-between"
                >
                    <NumberInputBase
                        value={quantity}
                        onChange={(e) =>
                            handleUpdateServices(
                                service,
                                Number(e.target.value),
                            )
                        }
                    />

                    <Typography
                        variant="body1"
                        fontWeight={600}
                        fontSize={14}
                        color="text.secondary"
                    >
                        Total:{' '}
                        {formatCurrency(
                            calculateServicePrice(
                                service,
                                quantity,
                                totalAdults,
                                totalStay,
                            ),
                        )}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}
