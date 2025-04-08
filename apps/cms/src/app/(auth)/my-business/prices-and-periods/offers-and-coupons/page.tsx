'use client'

import { IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { Plus, Search, X } from 'lucide-react'
import { useState } from 'react'

import { LinkButton } from '@/components/atoms/LinkButton'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'

import { OffersAndCouponsForm } from './components/OffersAndCouponsForm'

export default function OfertasECupons() {
    const [searchInputValue, setSearchInputValue] = useState<string>('')
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')

    const chipItems = [
        { key: 'published', label: 'Publicadas' },
        { key: 'unpublished', label: 'Não publicadas' },
    ]

    return (
        <div className="offers_and_coupons">
            <PageHeader
                title="Ofertas e Cupons"
                backLButtonLabel="Preços e Períodos"
                backButtonHref="/my-business/prices-and-periods"
                headerRight={
                    <LinkButton
                        href="/my-business/prices-and-periods/offers-and-coupons/create"
                        startIcon={<Plus size={16} />}
                    >
                        Adicionar
                    </LinkButton>
                }
            />
            <Stack
                direction="row"
                flex={1}
                justifyContent="space-between"
                alignItems="center"
            >
                <ChipFilter
                    items={chipItems}
                    value={selectedFilters}
                    onChange={setSelectedFilters}
                />

                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Pesquisar"
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setSearchInputValue('')
                                            setSearchQuery('')
                                        }}
                                    >
                                        {searchQuery.length > 0 ? (
                                            <X size={16} />
                                        ) : (
                                            <Search size={16} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Stack>
            <OffersAndCouponsForm />
        </div>
    )
}
