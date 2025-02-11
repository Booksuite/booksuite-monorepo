import { InternalMenu } from "@/components/shared/InternalMenu";
import { PageHeader } from "@/components/shared/PageHeader";
import BoxIcon from "@/components/svgs/icons/BoxIcon";
import GlassesIcon from "@/components/svgs/icons/GlassesIcon";
import HomeIcon from "@/components/svgs/icons/HomeIcon";
import MoneyIcon from "@/components/svgs/icons/MoneyIcon";
import PlusIcon from "@/components/svgs/icons/PlusIcon";

export default function MeuNegocio() {
  return (
    <div className="MeuNegocio">
      <PageHeader.Root>
        <PageHeader.BackLink href="/">Início</PageHeader.BackLink>

        <PageHeader.Title>Meu Negócio</PageHeader.Title>
      </PageHeader.Root>

      <InternalMenu.Root>
        <InternalMenu.Button href="/meu-negocio/acomodacoes">
          <HomeIcon />
          Acomodações
        </InternalMenu.Button>

        <InternalMenu.Button href="/meu-negocio/precos-e-periodos">
          <MoneyIcon />
          Preços e Períodos
        </InternalMenu.Button>

        <InternalMenu.Button href="/meu-negocio/extras">
          <PlusIcon />
          Extras
        </InternalMenu.Button>

        <InternalMenu.Button href="/meu-negocio/experiencias">
          <GlassesIcon />
          Experiências
        </InternalMenu.Button>

        <InternalMenu.Button href="/meu-negocio/opcoes-de-tarifas">
          <BoxIcon />
          Opções de Tarifas
        </InternalMenu.Button>
      </InternalMenu.Root>
    </div>
  );
}
