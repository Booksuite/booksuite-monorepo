"use client";

import { Search2Icon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

export default function SearchBox() {
  return (
    <InputGroup className="searchBox">
      <InputLeftElement pointerEvents="none">
        <Search2Icon />
      </InputLeftElement>
      <Input type="text" placeholder="Pesquisar" />
    </InputGroup>
  );
}
