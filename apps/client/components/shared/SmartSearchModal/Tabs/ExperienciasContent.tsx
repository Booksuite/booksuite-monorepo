import Button from "@/components/buttons/Button";
import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import InputCheckboxBox from "@/components/shared/form/InputCheckbox";

export function ExperienciasContent() {
  return (
    <div>
      <Box bg={"white"} className="border rounded-md p-6 text-[0.9375rem]">
        <h4 className="mb-6 text-center text-[1.125rem]">Qual o motivo da sua viagem?</h4>

        <Stack>
          <InputCheckboxBox variant="labelFirst" className="bg-opacity py-2 pr-2 rounded-md">
            Férias e lazer
          </InputCheckboxBox>

          <InputCheckboxBox variant="labelFirst" className="bg-opacity py-2 pr-2 rounded-md">
            Aniversário
          </InputCheckboxBox>

          <InputCheckboxBox variant="labelFirst" className="bg-opacity py-2 pr-2 rounded-md">
            Descanso
          </InputCheckboxBox>

          <InputCheckboxBox variant="labelFirst" className="bg-opacity py-2 pr-2 rounded-md">
            Lua de mel
          </InputCheckboxBox>

          <InputCheckboxBox variant="labelFirst" className="bg-opacity py-2 pr-2 rounded-md">
            Aniversário de casamento
          </InputCheckboxBox>

          <InputCheckboxBox variant="labelFirst" className="bg-opacity py-2 pr-2 rounded-md">
            Passeio ou turismo de aventura
          </InputCheckboxBox>

          <InputCheckboxBox variant="labelFirst" className="bg-opacity py-2 pr-2 rounded-md">
            Pedido de namoro ou noivado
          </InputCheckboxBox>

          <InputCheckboxBox variant="labelFirst" className="bg-opacity py-2 pr-2 rounded-md">
            Outros
          </InputCheckboxBox>
        </Stack>

        <Stack className="mt-6" direction={"row"} justifyContent={"space-between"}>
          <button type="button" className="all-[unset] underline" onClick={() => {}}>
            Limpar busca
          </button>

          <Button className="btn btn-primary min-w-48 text-[0.9375rem]" onClick={() => {}}>
            Avançar
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
