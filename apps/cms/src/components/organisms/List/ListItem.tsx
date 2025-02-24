import { Icons } from '@/components/svgs/icons'
import { AspectRatio, Button, Image, Stack, Text } from '@chakra-ui/react'
import { ListItemProps } from './types'

const ListItem: React.FC<ListItemProps> = ({
    variant = 'primary',
    ...props
}) => {
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
            align="center"
            spacing={4}
            w="100%"
            minH="5rem"
            p={4}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
            position="relative"
        >
            <Button
                position="absolute"
                left={-6}
                transform="translateX(-100%)"
                colorScheme="gray"
                variant="ghost"
            >
                <Icons.Drag />
            </Button>

            {variant === 'primary' && (
                <AspectRatio
                    w="4.5rem"
                    ratio={1}
                    borderRadius="md"
                    overflow="hidden"
                >
                    <Image
                        src={props.image || '/imagem-exemplo.png'}
                        objectFit="cover"
                    />
                </AspectRatio>
            )}

            <Stack direction="column" spacing={1} flex={1}>
                <Text fontWeight="bold" fontSize="md" isTruncated>
                    {props.title}
                </Text>

                <Text color="gray.600" fontSize="sm">
                    {props.subtitle}
                </Text>

                <Text
                    fontWeight="semibold"
                    fontSize="sm"
                    color={getStatusColor()}
                >
                    {props.status}
                </Text>
            </Stack>

            <Button ml="auto" variant="ghost" minW="auto" p={2}>
                <Icons.Options />
            </Button>
        </Stack>
    )
}

export default ListItem
