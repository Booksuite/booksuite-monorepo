'use client'

import {
    Box,
    Button,
    Flex,
    FormControl,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react'
import { ChangeEvent, useRef, useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import SelectBox from '@/components/atoms/SelectBox'

export default function VisualIdentityForm() {
    const [logo, setLogo] = useState<string | null>(null)
    const [favicon, setFavicon] = useState<string | null>(null)
    const [mainColor, setMainColor] = useState('#714C3B')

    const options = [
        { value: 'Quadrada', label: 'Quadrada' },
        { value: 'Retangulo', label: 'Retangulo' },
    ]

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
                <SelectBox
                    label="Prorção do logotipo"
                    options={options}
                    value={options}
                ></SelectBox>

                <FormControl
                    border={'1px solid'}
                    borderColor={'gray.100'}
                    p={4}
                    borderRadius="md"
                >
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        mb={2}
                    >
                        <Box>
                            <h2
                                style={{ fontWeight: '600', marginBottom: '0' }}
                            >
                                Adicionar seu logotipo
                            </h2>
                            <Text>
                                Arquivo deve ser em PNG com tamanho mínimo de
                                200px
                            </Text>
                        </Box>
                        <Button
                            onClick={openLogoSelector}
                            variant="solid"
                            colorScheme="primary"
                        >
                            Adicionar
                        </Button>
                    </Flex>

                    <Box
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

                    <input
                        type="file"
                        ref={logoInputRef}
                        onChange={handleLogoChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </FormControl>

                <FormControl
                    border={'1px solid'}
                    borderColor={'gray.100'}
                    p={4}
                    borderRadius="md"
                >
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        mb={2}
                    >
                        <Box>
                            <h2
                                style={{ fontWeight: '600', marginBottom: '0' }}
                            >
                                Adicionar seu favicon
                            </h2>
                            <Text>
                                Arquivo deve ser em ICO com tamanho mínimo de
                                32px
                            </Text>
                        </Box>
                        <Button
                            onClick={openFaviconSelector}
                            variant="solid"
                            colorScheme="primary"
                        >
                            Adicionar
                        </Button>
                    </Flex>
                    <Box
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

                    <input
                        type="file"
                        ref={faviconInputRef}
                        onChange={handleFaviconChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </FormControl>

                <FormControl>
                    <h2 style={{ fontWeight: '600' }}>Cor principal do site</h2>
                    <Flex align="center" gap={2} p={2}>
                        <InputBox
                            label={'Cor principal (HEX)'}
                            value={mainColor}
                            fontWeight="400"
                            onChange={(e) => setMainColor(e.target.value)}
                        />
                        <Box
                            bg={mainColor}
                            borderRadius="md"
                            boxSize="50px"
                        ></Box>
                    </Flex>
                </FormControl>
            </Stack>
        </Box>
    )
}
