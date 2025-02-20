import { Checkbox } from '@chakra-ui/react'
import { Props } from './types'

function InputCheckboxBox(props: Props) {
    return <Checkbox {...props}>{props.children}</Checkbox>
}

export default InputCheckboxBox
