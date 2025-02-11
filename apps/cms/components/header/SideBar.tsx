"use client";

import { useContext } from "react";
import { SidebarContext } from "@/app/providers/sidebarProvider";

import Logo from "@/components/svgs/Logo";
import Link from "next/link";

export default function SideBar() {
  const { isOpen } = useContext(SidebarContext);

  return (
    <div className={`SideBar ${isOpen ? "SideBar--open" : "SideBar--close"}`}>
      <div className="SideBar__content">
        <Logo className="SideBar__logo" />

        <nav className="SideBar__menu">
          <ul className="SideBar__menu__list">
            <li>
              <Link href={"/"}>Início</Link>
            </li>
            <li>
              <Link href={"/mapa"}>Mapa</Link>
            </li>
            <li>
              <Link href={"/relatorios"}>Relatórios</Link>
            </li>
            <li>
              <Link href={"/meu-negocio"}>Meu Negócio</Link>
            </li>
            <li>
              <Link href={"/marketing"}>Marketing</Link>
            </li>
          </ul>
        </nav>

        <nav className="SideBar__menu SideBar__menu--footer">
          <ul className="SideBar__menu__list">
            <li>
              <Link href={"/configuracoes"}>Configurações</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
