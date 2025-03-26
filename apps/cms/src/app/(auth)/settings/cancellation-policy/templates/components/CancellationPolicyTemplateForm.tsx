import {
    Box,
    Button,
    Collapse,
    IconButton,
    Text,
    VStack,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { ChevronDown, ChevronUp, CirclePlus } from 'lucide-react'
import { useState } from 'react'

type PolicyKeys = 'flexible' | 'balanced' | 'moderate' | 'strict'

type PoliciesType = Record<PolicyKeys, string[]>

type OpenState = Record<PolicyKeys, boolean>

export const CancellationPolicyTemplatesForm = () => {
    const models: PolicyKeys[] = ['flexible', 'balanced', 'moderate', 'strict']
    const [open, setOpen] = useState<OpenState>({
        flexible: true,
        balanced: false,
        moderate: false,
        strict: false,
    })

    const policies: PoliciesType = {
        flexible: [
            'Cancelamento ou troca após o período de desistência obrigatório de 7 dias após a data de efetivação da reserva será cobrado uma taxa de cancelamento de 0% sobre o valor da primeira diária;O período de desistência obrigatório só é válido, caso a reserva seja efetuada com antecedência mínima de 8 dias até o check-in. Caso contrário, será aplicado a taxa de cancelamento padrão;Cancelamento ou troca em até 1 dia antes do check-in, será cobrado 100% do valor da primeira diária;',
        ],
        balanced: [
            'Cancelamento ou troca após o período de desistência obrigatório de 7 dias após a data de efetivação da reserva será cobrado uma taxa de cancelamento de 0% sobre o valor da primeira diária;O período de desistência obrigatório só é válido, caso a reserva seja efetuada com antecedência mínima de 8 dias até o check-in. Caso contrário, será aplicado a taxa de cancelamento padrão;Cancelamento ou troca em até 1 dia antes do check-in, será cobrado 100% do valor da primeira diária;',
        ],
        moderate: [
            'Cancelamento ou troca após o período de desistência obrigatório de 7 dias após a data de efetivação da reserva será cobrado uma taxa de cancelamento de 0% sobre o valor da primeira diária;O período de desistência obrigatório só é válido, caso a reserva seja efetuada com antecedência mínima de 8 dias até o check-in. Caso contrário, será aplicado a taxa de cancelamento padrão;Cancelamento ou troca em até 1 dia antes do check-in, será cobrado 100% do valor da primeira diária;',
        ],
        strict: [
            'Cancelamento ou troca após o período de desistência obrigatório de 7 dias após a data de efetivação da reserva será cobrado uma taxa de cancelamento de 0% sobre o valor da primeira diária;O período de desistência obrigatório só é válido, caso a reserva seja efetuada com antecedência mínima de 8 dias até o check-in. Caso contrário, será aplicado a taxa de cancelamento padrão;Cancelamento ou troca em até 1 dia antes do check-in, será cobrado 100% do valor da primeira diária;',
        ],
    }

    const modelsTranslation: Record<PolicyKeys, string> = {
        flexible: 'Flexível',
        balanced: 'Equilibrado',
        moderate: 'Moderado',
        strict: 'Rigoroso',
    }

    const toggleModel = (model: PolicyKeys) => {
        setOpen((prev) => ({ ...prev, [model]: !prev[model] }))
    }

    return (
        <Formik
            initialValues={{ acceptPolicy: false }}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2))
            }}
        >
            {
                <Form>
                    <Box>
                        {models.map((model) => (
                            <Box
                                key={model}
                                borderWidth={1}
                                borderRadius={8}
                                p={4}
                                mb={4}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Text fontSize="lg" fontWeight="bold">
                                        Modelo {modelsTranslation[model]}
                                    </Text>
                                    <IconButton
                                        icon={
                                            open[model] ? (
                                                <ChevronUp size={20} />
                                            ) : (
                                                <ChevronDown size={20} />
                                            )
                                        }
                                        onClick={() => toggleModel(model)}
                                        variant="ghost"
                                        aria-label="Expand/Collapse"
                                    />
                                </Box>
                                <Collapse in={open[model]}>
                                    <VStack align="start" mt={3}>
                                        {policies[model].map((rule, i) => (
                                            <Text key={i} fontSize="md">
                                                {rule}
                                            </Text>
                                        ))}
                                        <Button
                                            mt={3}
                                            variant="outline"
                                            width={'100%'}
                                            leftIcon={<CirclePlus />}
                                            mb={4}
                                            size="lg"
                                        >
                                            Aplicar e Personalizar
                                        </Button>
                                    </VStack>
                                </Collapse>
                            </Box>
                        ))}
                    </Box>
                </Form>
            }
        </Formik>
    )
}
