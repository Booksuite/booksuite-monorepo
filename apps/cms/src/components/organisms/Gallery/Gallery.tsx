'use client'

import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    SimpleGrid,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

import { Icons } from '@/components/svgs/icons'
import { Gallery } from '.'

import { GalleryRootProps } from './types'

export function GalleryRoot(props: GalleryRootProps) {
    const [items, setItems] = useState(props.items ?? [])
    const toast = useToast()

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            const maxSizeInBytes = 5 * 1024 * 1024
            if (file.size > maxSizeInBytes) {
                toast({
                    title: 'Erro',
                    description: 'O tamanho da imagem não pode exceder 5 MB.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setItems((prev) => [...prev, result])
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Box w="full">
            {(!items || items.length === 0) && (
                <Flex
                    onClick={() =>
                        document.getElementById('fileInput')?.click()
                    }
                />
            )}

            {items && items.length > 0 && (
                <>
                    <Grid
                        templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                        gap={3}
                    >
                        {items.map((item: string, index) => (
                            <GridItem key={index} w="100%">
                                <Gallery.Item
                                    index={index}
                                    src={item}
                                    selected={index === 1}
                                />
                            </GridItem>
                        ))}
                    </Grid>

                    <SimpleGrid columns={2} gap={2} mt={5}>
                        <Button
                            as="label"
                            variant="outline"
                            leftIcon={<Icons.Plus />}
                            cursor={'pointer'}
                        >
                            Adicionar Foto
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </Button>
                        <Button variant="outline" leftIcon={<Icons.OrderBy />}>
                            Ordenar
                        </Button>
                    </SimpleGrid>
                </>
            )}
        </Box>
    )
}
