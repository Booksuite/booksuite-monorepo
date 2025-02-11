import React, { type HTMLAttributes, type MouseEventHandler } from "react";
import { Icons } from "@/components/svgs/icons";
import { Stack } from "@chakra-ui/react";

import { SmartSearchModalProps } from "@/components/shared/SmartSearchModal/SmartSearchModal";

interface StepEscolhaProps extends HTMLAttributes<HTMLDivElement> {
  onNextStepClick: (e: SmartSearchModalProps["selectedTab"]) => void;
}

export default function StepEscolha({ onNextStepClick, ...props }: StepEscolhaProps) {
  return (
    <div {...props}>
      <h4 className="text-center mb-6">Como deseja iniciar a sua pesquisa?</h4>

      <Stack direction={"column"} spacing={2}>
        <button
          className="all-[unset] text-left bg-opacity p-5 flex items-center gap-2 w-full text-[0.9375rem]"
          onClick={() => onNextStepClick("datas")}
        >
          <Icons.CalendarCheck className="me-2 clr-primary" />

          <div>
            <Stack direction={"column"} spacing={0}>
              <h5 className="mb-0 ">Pesquisar datas</h5>
              <p>Escolha no calendário uma data de entrada e saída</p>
            </Stack>
          </div>

          <Icons.ChevronRight className="ms-auto" />
        </button>

        <button
          className="all-[unset] text-left bg-opacity p-5 flex items-center gap-2 w-full text-[0.9375rem]"
          onClick={() => onNextStepClick("experiencias")}
        >
          <Icons.Cheers className="me-2 clr-primary" />

          <div>
            <Stack direction={"column"} spacing={0}>
              <h5 className="mb-0 ">Buscar experiências</h5>
              <p>Serviços e passeios recomendados de acordo com o motivo da sua viagem</p>
            </Stack>
          </div>

          <Icons.ChevronRight className="ms-auto" />
        </button>

        <button
          className="all-[unset] text-left bg-opacity p-5 flex items-center gap-2 w-full text-[0.9375rem]"
          onClick={() => onNextStepClick("pacotes")}
        >
          <Icons.Airplane className="me-2 clr-primary" />

          <div>
            <Stack direction={"column"} spacing={0}>
              <h5 className="mb-0 ">Ver pacotes </h5>
              <p>Pacotes de viagem, feriados ou datas comemorativas</p>
            </Stack>
          </div>

          <Icons.ChevronRight className="ms-auto" />
        </button>

        <button
          className="all-[unset] text-left bg-opacity p-5 flex items-center gap-2 w-full text-[0.9375rem]"
          onClick={() => onNextStepClick("flexivel")}
        >
          <Icons.Map className="me-2 clr-primary" />

          <div>
            <Stack direction={"column"} spacing={0}>
              <h5 className="mb-0 ">Calendário flexível</h5>
              <p>Ideal se você ainda não tem uma data de entrada e saída definida</p>
            </Stack>
          </div>

          <Icons.ChevronRight className="ms-auto" />
        </button>
      </Stack>
    </div>
  );
}
