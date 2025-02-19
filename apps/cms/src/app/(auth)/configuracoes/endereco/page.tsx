'use client'

import { Button, Flex, Stack, useToast } from '@chakra-ui/react'
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api'
import React, { type FormEvent, useCallback, useRef, useState } from 'react'

import { useCompanyContext } from '@/app/providers/companyProvider'
import InputBox from '@/components/atoms/Input/InputBox'
import SelectBox from '@/components/atoms/SelectBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { toastGenericPatchMessages } from '@/contexts/constants/toastMessages'
import { updateCompany } from '@/services/company/updateCompany'
import type { UpdateCompanyDTO } from '@/types/Company'

const containerStyle = {
    width: '100%',
    height: '400px',
}

const getAdjustedPosition = (
    position: { lat: number; lng: number },
    offset: number,
) => {
    return {
        lat: position.lat + offset, // Ajusta latitude para cima
        lng: position.lng,
    }
}

export default function Endereco() {
    const { company, setCompany } = useCompanyContext()

    const [map, setMap] = useState(null)
    const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 })
    const [mapUrl, setMapUrl] = useState('')
    const [infoOpen, setInfoOpen] = useState(false)
    const [formData, setFormData] = useState<UpdateCompanyDTO>(null)
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const markerRef = useRef<any | null>(null)

    const toast = useToast()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (isSaving || !formData) {
            return
        }

        setIsSaving(true)

        const response = new Promise((resolve, reject) => {
            resolve(updateCompany(company.id, formData))
        })
            .then((resp: any) => {
                if (resp.success) {
                    if (resp.company) {
                        setCompany(resp.company)
                    }
                }
            })
            .finally(() => {
                setIsSaving(false)
            })

        toast.promise(response, toastGenericPatchMessages)
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAPS_API,
    })

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const coordinates = extractLatLngFromUrl(e.target.value)

        console.log(coordinates)

        if (coordinates) {
            setCenter(coordinates)
            setInfoOpen(true)
            map.panTo(coordinates) // Atualiza o centro do mapa
        }

        setMapUrl(e.target.value)
    }

    const extractLatLngFromUrl = (url: string) => {
        const regex = /@(.*?),(.*?),/
        const match = url.match(regex)

        if (match) {
            const lat = parseFloat(match[1])
            const lng = parseFloat(match[2])
            return { lat, lng }
        }

        return null
    }

    if (!company) {
        return
    }

    //"Rua Avenida Estrada"
    return (
        <div className="Endereco">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Endereço</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <InputBox label="CEP" defaultValue={'88903-000'} />
                        <InputBox
                            label="Endereço"
                            defaultValue={company.address}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    address: event.target.value,
                                })
                            }}
                        />
                        <InputBox
                            label="Número"
                            defaultValue={company.number}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    number: event.target.value,
                                })
                            }}
                        />

                        <SelectBox
                            options={[
                                {
                                    value: 'Santa Catarina',
                                    label: 'Santa Catarina',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            defaultValue={
                                company.state
                                    ? {
                                          value: company.state,
                                          label: company.state,
                                      }
                                    : null
                            }
                            onChange={(e: { value: string; label: string }) => {
                                setFormData({ ...formData, state: e.value })
                            }}
                            label="Estado"
                        />

                        <SelectBox
                            options={[
                                {
                                    value: 'Araranguá',
                                    label: 'Araranguá',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            defaultValue={
                                company.city
                                    ? {
                                          value: company.city,
                                          label: company.city,
                                      }
                                    : null
                            }
                            onChange={(e: { value: string; label: string }) => {
                                setFormData({ ...formData, city: e.value })
                            }}
                            label="Cidade"
                        />

                        <SelectBox
                            name="priceAdjustment"
                            options={[
                                {
                                    value: 'Brasil',
                                    label: 'Brasil',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            defaultValue={
                                company.country
                                    ? {
                                          value: company.country,
                                          label: company.country,
                                      }
                                    : null
                            }
                            onChange={(e: { value: string; label: string }) => {
                                setFormData({ ...formData, country: e.value })
                            }}
                            label="País"
                        />

                        <InputBox
                            label="URL no Google Maps"
                            defaultValue={'https://'}
                            onChange={handleUrlChange}
                        />

                        {isLoaded && (
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={14}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                <Marker
                                    position={center}
                                    onClick={() => setInfoOpen(!infoOpen)}
                                    ref={markerRef}
                                ></Marker>
                                {infoOpen && (
                                    <InfoWindow
                                        anchor={markerRef.current}
                                        onCloseClick={() => setInfoOpen(false)}
                                    >
                                        <div>
                                            <h2>Localização</h2>
                                            <p>Latitude: {center.lat}</p>
                                            <p>Longitude: {center.lng}</p>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        )}
                    </Flex>

                    <Button type="submit" isLoading={isSaving}>
                        Salvar
                    </Button>
                </Stack>
            </form>
        </div>
    )
}
