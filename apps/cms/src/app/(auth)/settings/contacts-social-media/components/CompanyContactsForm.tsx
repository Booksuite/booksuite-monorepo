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
import { useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import { ContactsData } from '../utils/config'
import { PHONE_TYPES, TYPES_OPTIONS } from '../utils/constants'

export default function CompanyContactsForm() {
    const { getFieldProps, values, handleChange, setFieldValue } =
        useFormikContext<ContactsData>()

    const [selectedType, setSelectedType] = useState<number | null>(null)
    const [selectedPhoneType, setSelectedPhoneType] = useState<number | null>(
        null,
    )

    return (
        <Form>
            <div className="CompanyContactForm">
                <FieldArray name="email">
                    {({ push, remove }) => (
                        <Stack spacing={4}>
                            <h3
                                style={{ fontWeight: '600', marginBottom: '0' }}
                            >
                                E-mails de Contato
                            </h3>
                            {values.email?.length ? (
                                values.email.map((email, index) => (
                                    <HStack
                                        key={index}
                                        spacing={2}
                                        alignItems="center"
                                        width="100%"
                                    >
                                        <InputBox
                                            label={`E-mail de ${email.category}`}
                                            type="email"
                                            {...getFieldProps(
                                                `email.${index}.value`,
                                            )}
                                            onChange={handleChange(
                                                `email.${index}.value`,
                                            )}
                                        />
                                        <IconButton
                                            icon={<Trash />}
                                            colorScheme="red"
                                            variant="ghost"
                                            onClick={() => remove(index)}
                                            aria-label={'Remover'}
                                            size={'lg'}
                                        />
                                    </HStack>
                                ))
                            ) : (
                                <h2>Nenhum Email encontrado</h2>
                            )}
                            <Flex gap={2}>
                                <Select
                                    size="lg"
                                    value={selectedType || ''}
                                    onChange={(e) =>
                                        setSelectedType(Number(e.target.value))
                                    }
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
                                                type: 'email',
                                                category:
                                                    TYPES_OPTIONS[selectedType]
                                                        ?.label || '',
                                                value: '',
                                            })
                                            setSelectedType(null)
                                        }
                                    }}
                                >
                                    Adicionar Email
                                </Button>
                            </Flex>
                        </Stack>
                    )}
                </FieldArray>

                <FieldArray name="phone">
                    {({ push, remove }) => (
                        <Stack spacing={4}>
                            <h3
                                style={{ fontWeight: '600', marginTop: '20px' }}
                            >
                                Telefones (Opcional)
                            </h3>
                            {values.phone?.length ? (
                                values.phone.map((phone, index) => (
                                    <HStack
                                        key={index}
                                        spacing={2}
                                        alignItems="center"
                                        width="100%"
                                    >
                                        <InputBox
                                            label={`Telefone - ${phone.category}`}
                                            type="tel"
                                            {...getFieldProps(
                                                `phone.${index}.value`,
                                            )}
                                            onChange={handleChange(
                                                `phone.${index}.value`,
                                            )}
                                        />
                                        <IconButton
                                            icon={<Trash />}
                                            colorScheme="red"
                                            variant="ghost"
                                            onClick={() => remove(index)}
                                            aria-label={'Remover'}
                                            size={'lg'}
                                        />
                                    </HStack>
                                ))
                            ) : (
                                <h2>Nenhum telefone encontrado</h2>
                            )}
                            <Flex gap={2}>
                                <Select
                                    size="lg"
                                    value={selectedPhoneType || ''}
                                    onChange={(e) =>
                                        setSelectedPhoneType(
                                            Number(e.target.value),
                                        )
                                    }
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
                                                type: 'phone',
                                                category:
                                                    PHONE_TYPES[
                                                        selectedPhoneType
                                                    ]?.label || '',
                                                value: '',
                                            })
                                            setSelectedPhoneType(null)
                                        }
                                    }}
                                >
                                    Adicionar Telefone
                                </Button>
                            </Flex>
                        </Stack>
                    )}
                </FieldArray>

                <FieldArray name="socialMedias">
                    {({ remove }) => (
                        <Stack spacing={4}>
                            <h3
                                style={{ fontWeight: '600', marginTop: '20px' }}
                            >
                                Redes Sociais (Opcional)
                            </h3>
                            {values.socialMedias.map((contact, index) => (
                                <HStack
                                    key={index}
                                    spacing={2}
                                    alignItems="center"
                                    width="100%"
                                >
                                    <InputBox
                                        label={contact.type}
                                        type="text"
                                        {...getFieldProps(
                                            `socialMedias.${index}.value`,
                                        )}
                                        onChange={(e) =>
                                            setFieldValue(
                                                `socialMedias.${index}.value`,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <IconButton
                                        icon={<Trash />}
                                        colorScheme="red"
                                        variant="ghost"
                                        onClick={() => remove(index)}
                                        aria-label={'Remover'}
                                        size={'lg'}
                                    />
                                </HStack>
                            ))}
                        </Stack>
                    )}
                </FieldArray>
            </div>
        </Form>
    )
}
