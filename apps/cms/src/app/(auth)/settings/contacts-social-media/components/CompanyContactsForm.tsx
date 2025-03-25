import { Button, HStack, IconButton, Stack } from '@chakra-ui/react'
import { FieldArray, useFormikContext } from 'formik'
import { CirclePlus, Trash } from 'lucide-react'

import InputBox from '@/components/atoms/InputBox'
import { ContactsData } from '../utils/config'

export default function CompanyContactsForm() {
    const { getFieldProps, touched, errors, values, handleChange } =
        useFormikContext<ContactsData>()

    return (
        <div className="CompanyContactForm">
            <FieldArray name="contacts">
                {({ push, remove }) => (
                    <Stack spacing={4}>
                        <h3 style={{ fontWeight: '600', marginBottom: '0' }}>
                            E-mails de Contato
                        </h3>
                        {values.contacts?.filter(
                            (contact) => contact.type === 'email',
                        ).length ? (
                            values.contacts.map(
                                (contact, index) =>
                                    contact.type === 'email' && (
                                        <HStack
                                            key={index}
                                            spacing={2}
                                            alignItems="center"
                                            width="100%"
                                        >
                                            <InputBox
                                                label="E-mail de Reserva"
                                                type="email"
                                                /*error={
                                                    errors?.contacts?.[index]
                                                        ?.value
                                                }
                                                formControl={{
                                                    isInvalid:
                                                        !!errors?.contacts?.[
                                                            index
                                                        ] &&
                                                        touched.contacts?.[
                                                            index
                                                        ],
                                                }}
                                                {...getFieldProps(
                                                    `contacts.${index}.value`,
                                                )}
                                                onChange={handleChange(
                                                    `contacts.${index}.value`,
                                                )}*/
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
                                    ),
                            )
                        ) : (
                            <h2>Nenhum Email encontrado</h2>
                        )}

                        <Button
                            variant="outline"
                            width={'100%'}
                            leftIcon={<CirclePlus />}
                            size={'lg'}
                            onClick={() => push({ type: 'email', value: '' })}
                        >
                            Adicionar Email
                        </Button>

                        <h3 style={{ fontWeight: '600', marginTop: '20px' }}>
                            Telefones (Opcional)
                        </h3>
                        {values.contacts?.filter(
                            (contact) => contact.type === 'phone',
                        ).length ? (
                            values.contacts.map(
                                (contact, index) =>
                                    contact.type === 'phone' && (
                                        <HStack
                                            key={index}
                                            spacing={2}
                                            alignItems="center"
                                            width="100%"
                                        >
                                            <InputBox
                                                label="Telefone"
                                                type="tel"
                                                /*error={
                                                    errors?.contacts?.[index]
                                                        ?.value
                                                }
                                                formControl={{
                                                    isInvalid:
                                                        !!errors?.contacts?.[
                                                            index
                                                        ] &&
                                                        touched.contacts?.[
                                                            index
                                                        ],
                                                }}
                                                {...getFieldProps(
                                                    `contacts.${index}.value`,
                                                )}*/
                                                onChange={handleChange(
                                                    `contacts.${index}.value`,
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
                                    ),
                            )
                        ) : (
                            <h2>Nenhum telefone encontrado</h2>
                        )}

                        <Button
                            variant="outline"
                            width={'100%'}
                            leftIcon={<CirclePlus />}
                            size={'lg'}
                            onClick={() => push({ type: 'phone', value: '' })}
                        >
                            Adicionar Telefone
                        </Button>

                        <h3 style={{ fontWeight: '600', marginTop: '20px' }}>
                            Redes Sociais (Opcional)
                        </h3>
                        {['instagram', 'facebook', 'linkedin', 'x'].map(
                            (social, index) => (
                                <InputBox
                                    key={social}
                                    label={
                                        social.charAt(0).toUpperCase() +
                                        social.slice(1)
                                    }
                                    type="text"
                                    /*error={errors?.contacts?.[index]?.value}
                                    formControl={{
                                        isInvalid:
                                            !!errors?.contacts?.[index] &&
                                            touched.contacts?.[index],
                                    }}
                                    {...getFieldProps(
                                        `contacts.${index}.value`,
                                    )}
                                    onChange={handleChange(
                                        `contacts.${index}.value`,
                                    )}*/
                                />
                            ),
                        )}
                    </Stack>
                )}
            </FieldArray>
        </div>
    )
}
