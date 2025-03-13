import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { EllipsisVertical } from 'lucide-react'
import { forwardRef } from 'react'

type CardOptionDotsProps = Omit<IconButtonProps, 'aria-label' | 'icon'>

export const CardOptionDots = forwardRef<
    typeof IconButton,
    CardOptionDotsProps
>((props, ref) => (
    <IconButton
        ref={ref}
        icon={<EllipsisVertical size={20} />}
        rounded="full"
        size="sm"
        variant="ghost"
        aria-label="Options"
        {...props}
    />
))
