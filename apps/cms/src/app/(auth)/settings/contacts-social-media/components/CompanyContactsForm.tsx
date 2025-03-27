import {
    Button,
    Flex,
    HStack,
    IconButton,
    Select,
    Stack,
} from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'
import { CirclePlus, Trash } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import { ContactsData } from '../utils/config'
import {
    companysocialMedias,
    PHONE_TYPES,
    TYPES_OPTIONS,
} from '../utils/constants'

export default function CompanyContactsForm() {
    const { getFieldProps, values, handleChange, setFieldValue } =
        useFormikContext<ContactsData>()

    const [selectedType, setSelectedType] = useState<number | null>(null)
    const [selectedPhoneType, setSelectedPhoneType] = useState<number | null>(
        null,
    )

    useEffect(() => {
        if (values.contacts?.length === 0) {
            setFieldValue('contacts', [
                ...companysocialMedias.map((social) => ({
                    type: social,
                    value: '',
                })),
            ])
        }
    }, [values.contacts, setFieldValue])

    return (
        <Form>
            <div className="CompanyContactForm">
                <FieldArray name="contacts">
                    {({ push, remove }) => (
                        <Stack spacing={4}>
                            <h3
                                style={{ fontWeight: '600', marginBottom: '0' }}
                            >
                                E-mails de Contato
                            </h3>
                            {values.contacts?.filter((contact) =>
                                TYPES_OPTIONS.some(
                                    (option) => option.label === contact.type,
                                ),
                            ).length ? (
                                values.contacts.map(
                                    (contact, index) =>
                                        TYPES_OPTIONS.some(
                                            (option) =>
                                                option.label === contact.type,
                                        ) && (
                                            <HStack
                                                key={index}
                                                spacing={2}
                                                alignItems="center"
                                                width="100%"
                                            >
                                                <InputBox
                                                    label={`E-mail de ${contact.type}`}
                                                    type="email"
                                                    {...getFieldProps(
                                                        `contacts.${index}.value`,
                                                    )}
                                                    onChange={handleChange(
                                                        `contacts.${index}.value`,
                                                    )}
                                                />
                                                <IconButton
                                                    icon={<Trash />}
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    aria-label={'Remover'}
                                                    size={'lg'}
                                                />
                                            </HStack>
                                        ),
                                )
                            ) : (
                                <h2>Nenhum Email encontrado</h2>
                            )}

                            <Flex gap={2}>
                                <Select
                                    size="lg"
                                    value={selectedType || ''}
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>,
                                    ) => {
                                        setSelectedType(Number(e.target.value))
                                    }}
                                >
                                    <option value="" disabled hidden>
                                        Selecione o tipo de email
                                    </option>
                                    {TYPES_OPTIONS.map(({ label }, index) => (
                                        <option key={index} value={index}>
                                            {label}
                                        </option>
                                    ))}
                                </Select>

                                <Button
                                    variant="outline"
                                    width={'100%'}
                                    leftIcon={<CirclePlus />}
                                    size={'lg'}
                                    isDisabled={selectedType === null}
                                    onClick={() => {
                                        if (selectedType !== null) {
                                            push({
                                                type: TYPES_OPTIONS[
                                                    selectedType
                                                ].label,
                                                value: '',
                                            })
                                            setSelectedType(null)
                                        }
                                    }}
                                >
                                    Adicionar Email
                                </Button>
                            </Flex>

                            <h3
                                style={{ fontWeight: '600', marginTop: '20px' }}
                            >
                                Telefones (Opcional)
                            </h3>
                            {values.contacts?.filter((contact) =>
                                PHONE_TYPES.some(
                                    (option: { label: string }) =>
                                        option.label === contact.type,
                                ),
                            ).length ? (
                                values.contacts.map(
                                    (contact, index) =>
                                        PHONE_TYPES.some(
                                            (option: { label: string }) =>
                                                option.label === contact.type,
                                        ) && (
                                            <HStack
                                                key={index}
                                                spacing={2}
                                                alignItems="center"
                                                width="100%"
                                            >
                                                <InputBox
                                                    label={`Telefone - ${contact.type}`}
                                                    type="tel"
                                                    {...getFieldProps(
                                                        `contacts.${index}.value`,
                                                    )}
                                                    onChange={handleChange(
                                                        `contacts.${index}.value`,
                                                    )}
                                                />
                                                <IconButton
                                                    icon={<Trash />}
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    aria-label={'Remover'}
                                                    size={'lg'}
                                                />
                                            </HStack>
                                        ),
                                )
                            ) : (
                                <h2>Nenhum telefone encontrado</h2>
                            )}

                            <Flex gap={2}>
                                <Select
                                    size="lg"
                                    value={selectedPhoneType || ''}
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>,
                                    ) => {
                                        setSelectedPhoneType(
                                            Number(e.target.value),
                                        )
                                    }}
                                >
                                    <option value="" disabled hidden>
                                        Selecione o tipo de telefone
                                    </option>
                                    {PHONE_TYPES.map(({ label }, index) => (
                                        <option key={index} value={index}>
                                            {label}
                                        </option>
                                    ))}
                                </Select>

                                <Button
                                    variant="outline"
                                    width={'100%'}
                                    leftIcon={<CirclePlus />}
                                    size={'lg'}
                                    isDisabled={selectedPhoneType === null}
                                    onClick={() => {
                                        if (selectedPhoneType !== null) {
                                            push({
                                                type: PHONE_TYPES[
                                                    selectedPhoneType
                                                ].label,
                                                value: '',
                                            })
                                            setSelectedPhoneType(null)
                                        }
                                    }}
                                >
                                    Adicionar Telefone
                                </Button>
                            </Flex>

                            <h3
                                style={{ fontWeight: '600', marginTop: '20px' }}
                            >
                                Redes Sociais (Opcional)
                            </h3>

                            {values.contacts
                                ?.filter((contact) =>
                                    companysocialMedias.includes(contact.type),
                                )
                                .map((contact, index) => (
                                    <InputBox
                                        key={index}
                                        label={contact.type}
                                        type="text"
                                        {...getFieldProps(
                                            `contacts.${index}.value`,
                                        )}
                                        onChange={(e) =>
                                            setFieldValue(
                                                `contacts.${index}.value`,
                                                e.target.value,
                                            )
                                        }
                                    />
                                ))}
                        </Stack>
                    )}
                </FieldArray>
            </div>
        </Form>
    )
}
