import {
    Button,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { FieldArray, useFormikContext } from 'formik'
import { CirclePlus, Trash } from 'lucide-react'
import { useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
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
        <FormContainer>
            <FormSection>
                <FieldArray name="email">
                    {({ push, remove }) => (
                        <FormSection title="E-mails de Contato">
                            {values.email?.length ? (
                                values.email.map((email, index) => (
                                    <Stack
                                        key={index}
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        width="100%"
                                    >
                                        <TextField
                                            label={`E-mail de ${email.category}`}
                                            type="email"
                                            fullWidth
                                            {...getFieldProps(
                                                `email.${index}.value`,
                                            )}
                                            onChange={handleChange(
                                                `email.${index}.value`,
                                            )}
                                        />
                                        <IconButton
                                            color="error"
                                            onClick={() => remove(index)}
                                            aria-label="Remover"
                                            size="large"
                                        >
                                            <Trash />
                                        </IconButton>
                                    </Stack>
                                ))
                            ) : (
                                <Typography variant="h6">
                                    Nenhum Email encontrado
                                </Typography>
                            )}
                            <Stack direction="row" spacing={2}>
                                <FormControl fullWidth>
                                    <Select
                                        value={selectedType || ''}
                                        onChange={(e) =>
                                            setSelectedType(
                                                Number(e.target.value),
                                            )
                                        }
                                        size="medium"
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            Selecione o tipo de email
                                        </MenuItem>
                                        {TYPES_OPTIONS.map(
                                            ({ label }, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={index}
                                                >
                                                    {label}
                                                </MenuItem>
                                            ),
                                        )}
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<CirclePlus />}
                                    size="large"
                                    disabled={selectedType === null}
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
                            </Stack>
                        </FormSection>
                    )}
                </FieldArray>
            </FormSection>

            <FormSection>
                <FieldArray name="phone">
                    {({ push, remove }) => (
                        <FormSection title="Telefones (Opcional)">
                            {values.phone?.length ? (
                                values.phone.map((phone, index) => (
                                    <Stack
                                        key={index}
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        width="100%"
                                    >
                                        <TextField
                                            label={phone.category}
                                            type="phone"
                                            fullWidth
                                            {...getFieldProps(
                                                `phone.${index}.value`,
                                            )}
                                            onChange={handleChange(
                                                `phone.${index}.value`,
                                            )}
                                        />
                                        <IconButton
                                            color="error"
                                            onClick={() => remove(index)}
                                            aria-label="Remover"
                                            size="large"
                                        >
                                            <Trash />
                                        </IconButton>
                                    </Stack>
                                ))
                            ) : (
                                <Typography variant="h6">
                                    Nenhum telefone encontrado
                                </Typography>
                            )}
                            <Stack direction="row" spacing={2}>
                                <FormControl fullWidth>
                                    <Select
                                        value={selectedPhoneType || ''}
                                        onChange={(e) =>
                                            setSelectedPhoneType(
                                                Number(e.target.value),
                                            )
                                        }
                                        size="medium"
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            Selecione o tipo de telefone
                                        </MenuItem>
                                        {PHONE_TYPES.map(({ label }, index) => (
                                            <MenuItem key={index} value={index}>
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<CirclePlus />}
                                    size="large"
                                    disabled={selectedPhoneType === null}
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
                            </Stack>
                        </FormSection>
                    )}
                </FieldArray>
            </FormSection>

            <FormSection>
                <FieldArray name="socialMedias">
                    {() => (
                        <FormSection title="Redes Sociais (Opcional)">
                            {values.socialMedias.map((contact, index) => (
                                <Stack
                                    key={index}
                                    spacing={2}
                                    alignItems="center"
                                    width="100%"
                                >
                                    <TextField
                                        label={contact.type}
                                        type="text"
                                        fullWidth
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
                                </Stack>
                            ))}
                        </FormSection>
                    )}
                </FieldArray>
            </FormSection>
        </FormContainer>
    )
}
