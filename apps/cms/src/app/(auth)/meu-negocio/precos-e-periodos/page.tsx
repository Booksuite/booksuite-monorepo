
import { InternalMenu } from "@/src/components/shared/InternalMenu";
import { PageHeader } from "@/src/components/shared/PageHeader";
import CalendarIcon from "@/src/components/svgs/icons/CalendarIcon";
import DiscountIcon from "@/src/components/svgs/icons/DiscountIcon";
import GiftIcon from "@/src/components/svgs/icons/GiftIcon";

export interface PrecosEPeriodosProps {}

export default function PrecosEPeriodos(props: PrecosEPeriodosProps) {
  return (
    <div className="PrecosEPeriodos">
      <PageHeader.Root>
        <PageHeader.BackLink href="/meu-negocio">
          Meu Negócio
        </PageHeader.BackLink>

        <PageHeader.Title>Preços e Períodos</PageHeader.Title>
      </PageHeader.Root>

      <InternalMenu.Root>
        <InternalMenu.Button href="precos-e-periodos/regras-de-temporada">
          <CalendarIcon />
          Regras de Temporada
        </InternalMenu.Button>

        <InternalMenu.Button href="precos-e-periodos/pacotes-e-feriados">
          <GiftIcon />
          Pacotes e Feriados
        </InternalMenu.Button>

        <InternalMenu.Button href="precos-e-periodos/ofertas-e-cupons">
          <DiscountIcon />
          Ofertas e Cupons
        </InternalMenu.Button>
      </InternalMenu.Root>
    </div>
  );
}
