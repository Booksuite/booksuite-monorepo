export interface ListItemProps {
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

export interface ListRootProps {
    children: React.ReactNode
}
