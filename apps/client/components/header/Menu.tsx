"use client";

import React from "react";

import { Stack } from "@chakra-ui/react";

import { MenuItem } from "./MenuItem";

export default function Menu() {
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
