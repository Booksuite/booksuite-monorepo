'use client'

import { SmallCloseIcon } from '@chakra-ui/icons'
import { useContext } from 'react'

import { SidebarContext } from '@/app/providers/sidebarProvider'
import MenuHamburgerIcon from '@/components/svgs/icons/MenuHamburgerIcon'

export default function HamburgerButton() {
    const { isOpen, setIsOpen } = useContext(SidebarContext)

    return (
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <SmallCloseIcon /> : <MenuHamburgerIcon />}
        </button>
    )
}
