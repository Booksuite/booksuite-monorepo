'use client'

import { Button, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'

import { Icons } from '@/components/svgs/icons'
import { Gallery } from '.'
import { GalleryGalleryRootProps } from './types'

export function GalleryRoot(props: GalleryGalleryRootProps) {
    const [items, setItems] = useState(props.items ?? [])

    function handleAddImage() {
        setItems((prev) => [...prev, '/imagem-exemplo.png'])
    }

    return (
        <div className="Gallery">
            {(!items || items.length === 0) && (
                <button className="Gallery__notFound" onClick={handleAddImage}>
                    <Icons.Image className="Gallery__notFound__icon mx-auto" />
                    Nenhuma foto selecionada. <br />{' '}
                    <b>Clique para selecionar</b>
                </button>
            )}

            {items && items.length > 0 && (
                <>
                    <Grid
                        templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                        gap={3}
                    >
                        {items.map((item: string, index) => (
                            <GridItem w="100%" key={index}>
                                <Gallery.Item
                                    index={index}
                                    src={item}
                                    selected={index === 1}
                                />
                            </GridItem>
                        ))}
                    </Grid>

                    <SimpleGrid columns={2} gap={2} className="mt-[1.25rem]">
                        <Button
                            variant="outline"
                            leftIcon={<Icons.Plus />}
                            onClick={handleAddImage}
                        >
                            Adicionar Foto
                        </Button>

                        <Button variant="outline" leftIcon={<Icons.OrderBy />}>
                            Ordenar
                        </Button>
                    </SimpleGrid>
                </>
            )}
        </div>
    )
}
