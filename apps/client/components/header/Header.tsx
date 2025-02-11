import Image from "next/image";
import React from "react";

import Menu from "@/components/header/Menu";
import UserMenu from "@/components/header/UserMenu";
import Link from "next/link";

interface HeaderProps {
  variant?: "transparent" | "default";
}

function Header({ variant = "default" }: HeaderProps) {
  return (
    <header className={`Header Header--${variant}`}>
      <Link href={"/"} className="Header__logo">
        <Image fill src={"/images/logo.png"} alt="" />
      </Link>

      <Menu />

      <UserMenu />
    </header>
  );
}

export default Header;
