import { Media } from '@booksuite/sdk'
import {
    Box,
    Button,
    CircularProgress,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { Search, X } from 'lucide-react'
import pluralize from 'pluralize'
import { useState } from 'react'

import { MediaItems } from '@/components/organisms/MediaItems'

interface MediaItemsProps {
    medias: Media[]
    selectedItems?: string[]
    isLoading?: boolean
    onSelectItem: (item: string) => void
    onUnselectAll: () => void
}

export const GalleryMediaItems: React.FC<MediaItemsProps> = ({
    medias,
    selectedItems = [],
    isLoading,
    onSelectItem,
    onUnselectAll,
}) => {
    const [searchInput, setSearchInput] = useState('')

    const filteredMedias = medias.filter((media) =>
        media.url.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
        <Box height={1000}>
            <Stack direction="row" justifyContent="space-between" mb={4}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={3}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Pesquisar"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={14} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {isLoading && (
                        <CircularProgress
                            size={20}
                            sx={{ color: 'gray.400' }}
                        />
                    )}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Stack>
                        <Typography variant="body2" color="text.secondary">
                            {selectedItems.length}{' '}
                            {pluralize('item', selectedItems.length)}{' '}
                            selecionados
                        </Typography>
                    </Stack>

                    <Button
                        disabled={selectedItems.length < 1}
                        variant="outlined"
                        size="small"
                        startIcon={<X />}
                        onClick={onUnselectAll}
                    >
                        Desmarcar todos
                    </Button>
                </Stack>
            </Stack>

            <MediaItems
                medias={filteredMedias}
                selectable
                selectedItems={selectedItems}
                onSelectItem={onSelectItem}
                actions={[
                    {
                        id: 'delete',
                        children: 'Excluir',
                        onClick: onUnselectAll,
                    },
                ]}
            />
        </Box>
    )
}
