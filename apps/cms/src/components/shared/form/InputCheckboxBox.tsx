import React from 'react'

import { Checkbox, CheckboxProps } from '@chakra-ui/react'

interface Props extends CheckboxProps {
    children?: React.ReactNode
}

function InputCheckboxBox(props: Props) {
    return <Checkbox {...props}>{props.children}</Checkbox>
}

export default InputCheckboxBox
