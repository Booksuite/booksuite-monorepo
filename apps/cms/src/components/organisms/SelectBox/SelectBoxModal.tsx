'use client'

import { SearchIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Text,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { SelectBoxModalProps } from './types'

export const SelectBoxModal = <T extends { name: string; id: string }>({
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
        <Modal size="xl" {...props}>
            <ModalOverlay />
            <ModalContent maxW="800px">
                <HStack p={6} pb={0} align="flex-end" justify="space-between">
                    <Box>
                        <ModalHeader p={0}>{title}</ModalHeader>
                        <Text mb={4}>{description}</Text>
                    </Box>

                    <InputGroup maxW={300} size="sm">
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                            borderRadius={6}
                            placeholder="Pesquisar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                </HStack>

                <ModalBody>
                    <Box mb={4}></Box>

                    {tabs.length > 0 && (
                        <>
                            <HStack
                                spacing={0}
                                mb={4}
                                overflowX="auto"
                                borderBottom="1px solid"
                                borderColor="gray.200"
                            >
                                {tabs.map((tabItem) => {
                                    const selected = selectedTab === tabItem
                                    return (
                                        <Box
                                            key={tabItem[0]}
                                            px={4}
                                            py={2}
                                            cursor="pointer"
                                            borderBottom={
                                                selected ? '2px solid' : 'none'
                                            }
                                            borderColor={
                                                selected
                                                    ? 'blue.500'
                                                    : 'transparent'
                                            }
                                            color={
                                                selected
                                                    ? 'blue.500'
                                                    : 'gray.600'
                                            }
                                            fontWeight={
                                                selected ? '600' : 'normal'
                                            }
                                            onClick={() =>
                                                setSelectedTab(tabItem)
                                            }
                                        >
                                            {getTabDisplayName(tabItem)}
                                        </Box>
                                    )
                                })}
                            </HStack>

                            <Box>
                                {!!selectedTabItems.length && (
                                    <SimpleGrid columns={[1, 2]} spacing={2}>
                                        {selectedTabItems?.map((item) => {
                                            const selected = selectedItems.some(
                                                (i) =>
                                                    keyGetter(i) ===
                                                    keyGetter(item),
                                            )

                                            return (
                                                <Box
                                                    key={keyGetter(item)}
                                                    p={2}
                                                    borderRadius="md"
                                                    border="1px solid"
                                                    borderColor={
                                                        selected
                                                            ? '#002159'
                                                            : 'gray.200'
                                                    }
                                                    bg={
                                                        selected
                                                            ? '#0021590D'
                                                            : 'white'
                                                    }
                                                >
                                                    <HStack
                                                        align="center"
                                                        justify="space-between"
                                                    >
                                                        <FormLabel
                                                            m={0}
                                                            htmlFor={keyGetter(
                                                                item,
                                                            )}
                                                        >
                                                            {renderItemContent(
                                                                item,
                                                                selected,
                                                            )}
                                                        </FormLabel>
                                                        <Checkbox
                                                            id={keyGetter(item)}
                                                            isChecked={selected}
                                                            onChange={() =>
                                                                toggleItem(item)
                                                            }
                                                            color="gray"
                                                        />
                                                    </HStack>
                                                </Box>
                                            )
                                        })}
                                    </SimpleGrid>
                                )}
                            </Box>
                        </>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Flex justify="flex-end" w="100%">
                        <Flex gap={2}>
                            <Button
                                variant="outline"
                                onClick={props.onClose}
                                size="sm"
                            >
                                {cancelButtonText}
                            </Button>
                            <Button
                                onClick={handleConfirm}
                                variant="solid"
                                colorScheme="blue"
                                size="sm"
                            >
                                {selectButtonText} ({selectedItems.length})
                            </Button>
                        </Flex>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
