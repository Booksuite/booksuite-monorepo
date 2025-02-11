import { Box, Stack } from "@chakra-ui/react";
import React, { type HTMLAttributes, type MouseEventHandler } from "react";
import InputCheckboxBox from "../form/InputCheckbox";
import Button from "@/components/buttons/Button";
import { Icons } from "@/components/svgs/icons";

interface StepMotivoProps extends HTMLAttributes<HTMLDivElement> {
  onSkipStepClick: () => void;
  onNextStepClick: () => void;
}

export default function StepMotivo({
  onSkipStepClick,
  onNextStepClick,
  ...props
}: StepMotivoProps) {
  return (
    <div {...props}>
      <h4 className="text-center mb-6">Qual o motivo da sua viagem?</h4>

      <Box bg={"white"} className="border rounded-md p-6 text-[0.9375rem]">
        <h5 className="text-center mb-6">
          Selecione uma ou mais opções abaixo:
        </h5>

        <Stack>
          <InputCheckboxBox
            variant="labelFirst"
            className="bg-opacity py-2 pr-2 rounded-md"
          >
            Férias e lazer
          </InputCheckboxBox>

          <InputCheckboxBox
            variant="labelFirst"
            className="bg-opacity py-2 pr-2 rounded-md"
          >
            Aniversário
          </InputCheckboxBox>

          <InputCheckboxBox
            variant="labelFirst"
            className="bg-opacity py-2 pr-2 rounded-md"
          >
            Descanso
          </InputCheckboxBox>

          <InputCheckboxBox
            variant="labelFirst"
            className="bg-opacity py-2 pr-2 rounded-md"
          >
            Lua de mel
          </InputCheckboxBox>

          <InputCheckboxBox
            variant="labelFirst"
            className="bg-opacity py-2 pr-2 rounded-md"
          >
            Aniversário de casamento
          </InputCheckboxBox>

          <InputCheckboxBox
            variant="labelFirst"
            className="bg-opacity py-2 pr-2 rounded-md"
          >
            Passeio ou turismo de aventura
          </InputCheckboxBox>

          <InputCheckboxBox
            variant="labelFirst"
            className="bg-opacity py-2 pr-2 rounded-md"
          >
            Pedido de namoro ou noivado
          </InputCheckboxBox>

          <InputCheckboxBox
            variant="labelFirst"
            className="bg-opacity py-2 pr-2 rounded-md"
          >
            Outros
          </InputCheckboxBox>
        </Stack>

        <Stack
          className="mt-6"
          direction={"row"}
          justifyContent={"space-between"}
        >
          <button
            type="button"
            className="all-[unset] underline"
            onClick={onSkipStepClick}
          >
            Pular
          </button>

          <Button
            className="btn btn-primary min-w-48 text-[0.9375rem]"
            onClick={onNextStepClick}
          >
            Avançar
          </Button>
        </Stack>
      </Box>

      <p className="mt-5 text-[0.8125rem]">
        <Icons.Question className="inline-block mr-1" />O preenchimento é
        opcional e serve para sugerirmos experiências personalizadas para sua
        viagem.
      </p>
    </div>
  );
}
