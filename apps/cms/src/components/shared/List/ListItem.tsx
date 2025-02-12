import React from 'react'

import { Icons } from '@/components/svgs/icons'
import { AspectRatio, Image, Stack } from '@chakra-ui/react'

interface ListItemProps {
    variant?: 'primary' | 'secondary'
    image?: string
    title: string
    subtitle?: string | React.ReactNode
    maxCapacity?: number
    status?:
        | 'Ativa'
        | 'Inativa'
        | 'Programado'
        | 'Em andamento'
        | 'Finalizada'
        | string
    statusColor?: 'green' | 'red' | 'yellow' | 'gray' | string
}

export function ListItem({ variant = 'primary', ...props }: ListItemProps) {
    function getStatusColor() {
        const colorMap = new Map([
            ['Ativa', 'var(--clr-success)'],
            ['Em andamento', 'var(--clr-success)'],
            ['Inativa', 'var(--clr-inactive)'],
            ['Programado', 'var(--clr-warning)'],
            ['Finalizada', 'var(--clr-alert)'],

            ['green', 'var(--clr-success)'],
            ['gray', 'var(--clr-inactive)'],
            ['yellow', 'var(--clr-warning)'],
            ['red', 'var(--clr-alert)'],
        ])

        if (props.statusColor) {
            return colorMap.get(props.statusColor) ?? props.statusColor
        }

        return colorMap.get(props.status)
    }

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            className={`ListItem ListItem--${variant}`}
        >
            <button className="ListItem__dragButton ml-auto" type="button">
                <Icons.Drag />
            </button>

            {variant === 'primary' && (
                <AspectRatio
                    className="shrink-0"
                    w={'100%'}
                    maxW={'4.5rem'}
                    ratio={1}
                >
                    <Image
                        className="ListItem__image"
                        src="/imagem-exemplo.png"
                        objectFit="cover"
                    />
                </AspectRatio>
            )}

            <Stack direction="column" spacing={0} className="ListItem__content">
                <h3 className="mb-0 ListItem__title text-ellipsis line-clamp-1">
                    {props.title}
                </h3>

                <Stack
                    direction={variant === 'primary' ? 'column' : 'row'}
                    spacing={variant === 'primary' ? 0 : 2}
                >
                    <p className="mb-0 ListItem__subtitle">{props.subtitle}</p>

                    <p
                        className="mb-0 ListItem__status"
                        style={
                            {
                                '--status-clr': getStatusColor(),
                            } as React.CSSProperties
                        }
                    >
                        {props.status}
                    </p>
                </Stack>
            </Stack>

            <button
                className="ListItem__optionsButton ml-auto shrink-0"
                type="button"
            >
                <Icons.Options />
            </button>
        </Stack>
    )
}
