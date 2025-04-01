'use client'

import SearchIcon from '@mui/icons-material/Search'
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    InputAdornment,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { SelectBoxModalProps } from './types'

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    padding: theme.spacing(2, 4),
    '&.Mui-selected': {
        color: theme.palette.primary.main,
        fontWeight: 600,
    },
}))

const SelectionCard = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.grey[200]}`,
    backgroundColor: selected ? `${theme.palette.primary.main}0D` : 'white',
}))

export const SelectModal = <T extends { name: string; id: string }>({
    onSelect,
    initialSelectedItems = [],
    items,
    tabFilter,
    filterGetter,
    querySearchGetter = (item: T) => item.name,
    keyGetter = (item: T) => item.id,
    renderItemContent = (item: T) => item.name,
    title,
    description,
    selectButtonText = 'Selecionar',
    cancelButtonText = 'Cancelar',
    ...props
}: SelectBoxModalProps<T>) => {
    const [selectedItems, setSelectedItems] =
        useState<T[]>(initialSelectedItems)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTab, setSelectedTab] = useState<string>('')

    useEffect(() => {
        setSelectedItems(initialSelectedItems)
    }, [initialSelectedItems, props.isOpen])

    const filterItems = useCallback(
        (items: T[], query: string, group?: string) => {
            if (!querySearchGetter) return items

            return items.filter((item) => {
                const filterQuery =
                    query === '' ||
                    querySearchGetter(item)
                        .toLowerCase()
                        .includes(query.toLowerCase())

                if (group && filterGetter) {
                    return filterQuery && filterGetter(item) === group
                }

                return filterQuery
            })
        },
        [filterGetter, querySearchGetter],
    )

    const groupedItems = useMemo(() => {
        const groupedItems = tabFilter?.reduce<Record<string, T[]>>(
            (acc, group) => {
                const filteredItems = filterItems(
                    items,
                    searchQuery,
                    group.value,
                )

                if (!acc[group.value] && filteredItems.length > 0) {
                    acc[group.value] = filteredItems
                }

                return acc
            },
            {},
        ) || { '': filterItems(items, searchQuery) }

        return groupedItems
    }, [filterItems, items, searchQuery, tabFilter])

    const toggleItem = (item: T) => {
        setSelectedItems((prev) => {
            const isSelected = prev.some(
                (i) => keyGetter(i) === keyGetter(item),
            )

            if (isSelected) {
                return prev.filter((i) => keyGetter(i) !== keyGetter(item))
            } else {
                return [...prev, item]
            }
        })
    }

    const handleConfirm = () => {
        onSelect(selectedItems)
        props.onClose?.()
    }

    const getTabDisplayName = (tabItem: string): string => {
        if (!tabFilter) return tabItem

        const tab = tabFilter.find((tab) => tab.value === tabItem)
        if (tab?.label) return tab.label

        return tabItem
    }

    const tabs = useMemo(() => {
        return Object.keys(groupedItems)
    }, [groupedItems])

    const selectedTabItems = useMemo(() => {
        return groupedItems[selectedTab] || []
    }, [groupedItems, selectedTab])

    useEffect(() => {
        setSelectedTab(tabFilter?.[0]?.value || '')
    }, [tabFilter])

    return (
        <Dialog
            maxWidth="md"
            fullWidth
            open={props.isOpen || false}
            {...props}
            slotProps={{
                paper: {
                    sx: {
                        maxWidth: '800px',
                    },
                },
            }}
        >
            <Stack
                p={6}
                pb={0}
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
            >
                <Box>
                    <DialogTitle sx={{ p: 0 }}>{title}</DialogTitle>
                    <Typography>{description}</Typography>
                </Box>

                <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Pesquisar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ maxWidth: 300 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <DialogContent sx={{ py: 3 }}>
                {tabs.length > 0 && (
                    <>
                        <Tabs
                            value={selectedTab}
                            onChange={(_, value) => setSelectedTab(value)}
                            sx={{
                                mb: 2,
                                borderBottom: 1,
                                borderColor: 'divider',
                            }}
                        >
                            {tabs.map((tabItem) => (
                                <StyledTab
                                    key={tabItem}
                                    label={getTabDisplayName(tabItem)}
                                    value={tabItem}
                                />
                            ))}
                        </Tabs>

                        <Box>
                            {!!selectedTabItems.length && (
                                <Grid container spacing={1}>
                                    {selectedTabItems?.map((item) => {
                                        const selected = selectedItems.some(
                                            (i) =>
                                                keyGetter(i) ===
                                                keyGetter(item),
                                        )

                                        return (
                                            <Grid
                                                key={keyGetter(item)}
                                                size={6}
                                            >
                                                <SelectionCard
                                                    selected={selected}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                    >
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        selected
                                                                    }
                                                                    onChange={() =>
                                                                        toggleItem(
                                                                            item,
                                                                        )
                                                                    }
                                                                    color="primary"
                                                                />
                                                            }
                                                            label={renderItemContent(
                                                                item,
                                                                selected,
                                                            )}
                                                            sx={{
                                                                m: 0,
                                                                width: '100%',
                                                            }}
                                                        />
                                                    </Stack>
                                                </SelectionCard>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            )}
                        </Box>
                    </>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 6, pb: 6 }}>
                <Button variant="outlined" onClick={props.onClose} size="small">
                    {cancelButtonText}
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    {selectButtonText} ({selectedItems.length})
                </Button>
            </DialogActions>
        </Dialog>
    )
}
