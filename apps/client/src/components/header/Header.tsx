"use client";

import Image from "next/image";
import Link from "next/link";
import { Stack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import { Icon } from "../icons/Index";
// import { useCartContext } from "@/hooks/useCartContext";

interface HeaderProps {
  variant?: "transparent" | "default";
}

function Header({ variant = "default" }: HeaderProps) {
  return (
    <header className={`Header Header--${variant}`}>
      <Link href={"/"} className="Header__logo">
        <Image fill src={"/images/logo.png"} alt="Logo" />
      </Link>
      <Menu />
      <UserMenu />
    </header>
  );
}

function Menu() {
  return (
    <nav className="Menu">
      <Stack direction={"row"} spacing={4}>
        <MenuItem href="/">Início</MenuItem>
        <MenuItem href="/acomodacoes">Acomodações</MenuItem>
        <MenuItem href="/experiencias">Experiências</MenuItem>
        <MenuItem href="#">Pacotes</MenuItem>
        <MenuItem href="#">Promoções</MenuItem>
        <MenuItem href="#">Galeria</MenuItem>
        <MenuItem href="#">Novidades</MenuItem>
        <MenuItem href="#">Atrativos</MenuItem>
        <MenuItem href="#">Sobre</MenuItem>
        <MenuItem href="#">Contato</MenuItem>
      </Stack>
    </nav>
  );
}

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function MenuItem({ href, children, className }: MenuItemProps) {
  // 3. Aqui, o usePathname já é seguro para ser usado
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${pathname === href ? "font-bold" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}

function UserMenu() {
  // const { cart } = useCartContext();

  return (
    <Stack className="UserMenu" alignItems="center" gap={3} direction={"row"}>
      <div className="UserMenu__list">
        {/* <Link className="relative" href={"/carrinho"}>
          <Icons.Cart className="UserMenu__cartIcon" />
          {cart.length > 0 && (
            <div className="flex items-center justify-center text-white text-[0.625rem] leading-[1] absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] w-[1rem] h-[1rem] bg-red rounded-full">
              {cart.length < 9 ? cart.length : "9+"}
            </div>
          )}
        </Link> */}
      </div>

      <div className="UserMenu__profile">
        <Icon.Person className="UserMenu__profile__icon" />
      </div>
    </Stack>
  );
}

export default Header;
