'use client'

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    Stack,
    Text,
} from '@chakra-ui/react'
import { CirclePlus } from 'lucide-react'
import { ChangeEvent, useRef, useState } from 'react'

export default function VisualIdentityForm() {
    const [logo, setLogo] = useState<string | null>(null)
    const [favicon, setFavicon] = useState<string | null>(null)
    const [mainColor, setMainColor] = useState('#714C3B')

    const logoInputRef = useRef<HTMLInputElement>(null)
    const faviconInputRef = useRef<HTMLInputElement>(null)

    const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setLogo(imageUrl)
        }
    }
    const handleFaviconChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setFavicon(imageUrl)
        }
    }

    const openLogoSelector = () => {
        if (logoInputRef.current) {
            logoInputRef.current.click()
        }
    }

    const openFaviconSelector = () => {
        if (faviconInputRef.current) {
            faviconInputRef.current.click()
        }
    }

    return (
        <Box mx="auto" p={4} bg="white" borderRadius="lg">
            <Stack spacing={4}>
                <FormControl>
                    <h2 style={{ fontWeight: '600' }}>Upload Logotipo</h2>

                    <Box
                        borderWidth={1}
                        borderRadius="md"
                        p={4}
                        bg="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {logo ? (
                            <Image
                                src={logo || '/placeholder.svg'}
                                alt="Logotipo"
                                boxSize="120px"
                                borderRadius="full"
                            />
                        ) : (
                            <Text color="gray.500">
                                Nenhuma imagem selecionada
                            </Text>
                        )}
                    </Box>

                    {/* Input oculto para o logotipo */}
                    <input
                        type="file"
                        ref={logoInputRef}
                        onChange={handleLogoChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />

                    <Button
                        mt={3}
                        variant="outline"
                        width={'100%'}
                        leftIcon={<CirclePlus size={16} />}
                        mb={4}
                        size={'lg'}
                        onClick={openLogoSelector}
                    >
                        Substituir Logotipo
                    </Button>
                </FormControl>

                <FormControl>
                    <h2 style={{ fontWeight: '600' }}>Upload Favicon</h2>
                    <Box
                        borderWidth={1}
                        borderRadius="md"
                        p={4}
                        bg="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {favicon ? (
                            <Image
                                src={favicon || '/placeholder.svg'}
                                alt="Favicon"
                                boxSize="70px"
                            />
                        ) : (
                            <Text color="gray.500">
                                Nenhuma imagem selecionada
                            </Text>
                        )}
                    </Box>

                    {/* Input oculto para o favicon */}
                    <input
                        type="file"
                        ref={faviconInputRef}
                        onChange={handleFaviconChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />

                    <Button
                        mt={3}
                        variant="outline"
                        width={'100%'}
                        leftIcon={<CirclePlus size={16} />}
                        mb={4}
                        size={'lg'}
                        onClick={openFaviconSelector}
                    >
                        Substituir Favicon
                    </Button>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight="bold">
                        Cor principal do site
                    </FormLabel>
                    <Flex
                        align="center"
                        gap={2}
                        bg="gray.50"
                        p={2}
                        borderRadius="md"
                    >
                        <Input
                            value={mainColor}
                            isReadOnly
                            borderWidth={0}
                            fontWeight="bold"
                            onChange={(e) => setMainColor(e.target.value)}
                        />
                        <Box
                            bg={mainColor}
                            borderRadius="md"
                            boxSize="75px"
                        ></Box>
                    </Flex>
                </FormControl>
            </Stack>
        </Box>
    )
}
