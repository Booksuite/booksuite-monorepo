import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";
import Button from "@/components/buttons/Button";
import { InputRadioBox } from "@/components/shared/form/InputRadioBox";

export function PacotesContent() {
  return (
    <div>
      <Box bg={"white"} className="border rounded-md p-6 text-[0.9375rem]">
        <h4 className="mb-6 text-center text-[1.125rem]">Selecione o pacote desejado</h4>

        <Stack>
          <RadioGroup name="form-name">
            <Radio>Radio 1</Radio>
            <Radio>Radio 2</Radio>
          </RadioGroup>

          <InputRadioBox.Root htmlFor="dia-namorados">
            <InputRadioBox.Label>
              <b>Dia dos Namorados</b> <br />
              12 jun. 2024 - 15 jun. 2024
              <p>
                <small>Mínimo de 2 diárias no período</small>
              </p>
              <select name="" id="">
                <option value="">ae</option>
                <option value="">ae</option>
                <option value="">ae</option>
              </select>
            </InputRadioBox.Label>

            <input name="pacote" type="radio" id="dia-namorados" />
          </InputRadioBox.Root>

          <InputRadioBox.Root>
            <label htmlFor="dia-namorados-2">
              <b>Dia dos Namorados 2</b> <br />
              12 jun. 2024 - 15 jun. 2024
            </label>

            <input name="pacote" type="radio" id="dia-namorados-2" />
          </InputRadioBox.Root>
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
