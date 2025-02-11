"use client";

import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import { Icons } from "../svgs/icons";
import { SmartSearchModal } from "@/components/shared/SmartSearchModal/SmartSearchModal";
import { useDisclosure } from "@chakra-ui/react";

interface SmartSearchBarProps {
  hideReserveButton?: boolean;
}

export function SmartSearchBar({
  hideReserveButton = false,
}: SmartSearchBarProps) {
  const {
    isOpen: isSmartSearchOpen,
    onOpen: onSmartSearchOpen,
    onClose: onSmartSearchClose,
  } = useDisclosure();

  return (
    <div className="SmartSearch border">
      <div>
        <h3 className="SmartSearch__title">Busca inteligente:</h3>
        <h4 className="SmartSearch__subtitle">
          Datas · Experiências · Pacotes · Flexível
        </h4>
      </div>

      <Stack direction={"row"} spacing={2}>
        <Button onClick={onSmartSearchOpen} leftIcon={<Icons.Search />}>
          Pesquisar
        </Button>
        {hideReserveButton === false && (
          <Button variant={"outline"}>Reservar</Button>
        )}
      </Stack>

      <SmartSearchModal
        onClose={onSmartSearchClose}
        isOpen={isSmartSearchOpen}
      />
    </div>
  );
}
