import { IconButton, Stack, useToast, VStack } from '@chakra-ui/react'
import { FieldArray, useFormikContext } from 'formik'
import { CirclePlus } from 'lucide-react'

import InputBox from '@/components/atoms/InputBox'
import { ContactsData } from '../utils/config'

export default function CompanyContactsForm() {
    const toast = useToast()

    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<ContactsData>()

    return (
        <div className="CompanyContactForm">
            <FieldArray name="emails">
                {({ push, remove }) => (
                    <Stack spacing={4}>
                        {values.contacts && values.contacts.length > 0 ? (
                            values.contacts.map((_, index) => (
                                <VStack
                                    key={index}
                                    spacing={2}
                                    alignItems="start"
                                >
                                    <InputBox
                                        label="Email"
                                        type="text"
                                        error={errors?.contacts}
                                        formControl={{
                                            isInvalid:
                                                !!errors?.contacts &&
                                                touched.contacts,
                                        }}
                                        {...getFieldProps(
                                            `contacts.${index}.value`,
                                        )}
                                        onChange={handleChange(
                                            `contacts.${index}.value`,
                                        )}
                                    />
                                </VStack>
                            ))
                        ) : (
                            <h2>Nenhum Email encontrado</h2>
                        )}

                        <IconButton
                            icon={<CirclePlus />}
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() =>
                                push({
                                    type: 'email',
                                    value: '',
                                })
                            }
                            aria-label="add"
                        />
                    </Stack>
                )}
            </FieldArray>
        </div>
    )
}
