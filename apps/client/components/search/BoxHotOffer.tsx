import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Icons } from "../svgs/icons";
import Button from "../buttons/Button";

export function BoxHotOffer() {
  return (
    <Box
      className="text-[0.8125rem]"
      borderWidth={1}
      borderColor={"var(--clr-orange)"}
      padding={4}
      borderRadius={12}
    >
      <h3 className="clr-orange text-xs font-semibold flex items-center gap-[4px]">
        <Icons.FireRounded className="flex-shrink-0" /> Oferta: 10% de desconto
      </h3>

      <h2 className="clr-black font-medium text-[0.9375rem]">Mês das Noivas</h2>

      <p>Desconto de 10% em diárias via Pix.</p>

      <Flex justifyContent="space-between">
        <div>
          <b>
            <Icons.Alarm width={20} height={"auto"} className="inline-block" /> Expira em:
          </b>{" "}
          30/05/2024
        </div>

        <Button fontSize={14} padding={0} variant={"naked"}>
          Ver detalhes <Icons.Modal width={20} height={"auto"} className="ml-2" />
        </Button>
      </Flex>
    </Box>
  );
}
