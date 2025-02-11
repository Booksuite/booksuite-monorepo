import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CopyRightBar } from "./CopyRightBar";

import { SimpleGrid, AspectRatio, Stack } from "@chakra-ui/react";
import { Icons } from "@/components/svgs/icons";

export function Footer() {
  return (
    <footer className="Footer text-[0.9375rem]">
      <div className="container">
        <SimpleGrid columns={3} spacing={10}>
          <div>
            <AspectRatio maxW={"80px"} ratio={1} className="mb-[20px]">
              <Image fill src={"/images/logo.png"} alt="" />
            </AspectRatio>

            <h2 className="Footer__subtitle !mb-[0.625rem]">
              Chalé Lagoa da Serra
            </h2>

            <p>CNPJ: 00.000.000-0001/01</p>

            <p>
              Rua Valdemar Nestor inácio, 1400 <br />
              Araranguá, Santa Catarina, CEP: 88.906.210
            </p>
          </div>

          <div>
            <h2 className="Footer__subtitle">Menu de navegação</h2>

            <nav className="Footer__menu">
              <ul className="Footer__menu__list columns-2">
                <li className="Footer__menu__item">
                  <Link href={"/"}>Início</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"/acomodacoes"}>Acomodações</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"/experiencias"}>Experiências</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"#"}>Pacotes</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"#"}>Promoções</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"#"}>Galeria</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"#"}>Novidades</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"#"}>Atrativos</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"#"}>Sobre</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"#"}>Contato</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"#"}>Minhas reservas</Link>
                </li>
                <li className="Footer__menu__item">
                  <Link href={"/politicas-e-termos-de-uso"}>Políticas</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h2 className="Footer__subtitle">Fale Conosco</h2>

            <p>WhatsApp: (48) 9 9999-9999</p>

            <p>Telefone: (48) 9 9999-9999</p>

            <p>Email: company@email.com</p>

            <Stack spacing={2} alignItems={"center"} direction={"row"}>
              <a href="#" target="_blank">
                <Icons.Facebook />
              </a>

              <a href="#" target="_blank">
                <Icons.Instagram />
              </a>
            </Stack>
          </div>
        </SimpleGrid>

        <CopyRightBar />
      </div>
    </footer>
  );
}
