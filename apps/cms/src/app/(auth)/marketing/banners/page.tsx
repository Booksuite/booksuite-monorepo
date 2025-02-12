"use client";


import { List } from "@/src/components/shared/List";
import { PageHeader } from "@/src/components/shared/PageHeader";
import { SimpleFilter } from "@/src/components/shared/SimpleFilter/SimpleFilter";
import { Icons } from "@/src/components/svgs/icons";
import { Button, Link } from "@chakra-ui/react";

export interface BannersProps {}

export default function Banners(props: BannersProps) {
  return (
    <div className="Banners">
      <PageHeader.Root>
        <PageHeader.BackLink href="/marketing">Marketing</PageHeader.BackLink>

        <PageHeader.Title>Banners</PageHeader.Title>
      </PageHeader.Root>

      <div>
        <SimpleFilter
          className="mb-[1rem]"
          items={[
            { label: "Ativas", checked: true },
            { label: "Inativas" },
            { label: "Todas" },
          ]}
          name="filtro"
          onChange={(values: Array<string>) => {
            console.log("Change Filter", values);
          }}
        />

        <section>
          <h3>Página Inicial</h3>
          <List.Root>
            <Link href="banner/detalhes">
              <List.Item
                title="Banner Institucional"
                subtitle={<>Banner Fixado</>}
                status="Ativo"
              />
            </Link>

            <Link href="banner/detalhes">
              <List.Item
                title="Banner Promo Mês dos Namorados"
                subtitle={<>01/06/2024 a 30/06/2024</>}
                status="Inativo"
              />
            </Link>
          </List.Root>
        </section>

        <section className="mt-8">
          <h3 className="mb-0">Banner Institucional</h3>
          <p style={{ color: "var(--clr-tertiary-600)" }}>
            Exibido entre sessões e áreas estratégicas do site
          </p>

          <List.Root>
            <Link href="banners/detalhes">
              <List.Item
                title="Banner de reservas padrão"
                subtitle={<>Banner fixado</>}
                status="Ativo"
              />
            </Link>

            <Link href="banners/detalhes">
              <List.Item
                title="Sorteio de dias dos namorados"
                subtitle={<>01/06/2024 a 30/06/2024</>}
                status="Ativo"
              />
            </Link>
          </List.Root>
        </section>

        <Button className="mt-[2.5rem] w-full" leftIcon={<Icons.Plus />}>
          Adicionar Banner
        </Button>
      </div>
    </div>
  );
}
