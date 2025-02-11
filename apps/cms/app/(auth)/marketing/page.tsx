import { InternalMenu } from "@/components/shared/InternalMenu";
import { PageHeader } from "@/components/shared/PageHeader";
import BoxIcon from "@/components/svgs/icons/BoxIcon";
import GlassesIcon from "@/components/svgs/icons/GlassesIcon";
import HomeIcon from "@/components/svgs/icons/HomeIcon";
import MoneyIcon from "@/components/svgs/icons/MoneyIcon";
import PlusIcon from "@/components/svgs/icons/PlusIcon";
import { Stack } from "@chakra-ui/react";

export default function Marketing() {
  return (
    <div className="Marketing">
      <PageHeader.Root>
        <PageHeader.BackLink href="/">Início</PageHeader.BackLink>

        <PageHeader.Title>Marketing</PageHeader.Title>
      </PageHeader.Root>

      <Stack direction={"column"} gap={2}>
        <InternalMenu.Root>
          <InternalMenu.Button href="/marketing/banners">
            <HomeIcon />
            Banners
          </InternalMenu.Button>
        </InternalMenu.Root>

        <InternalMenu.Root>
          <InternalMenu.Button href="/marketing/automacoes">
            <HomeIcon />
            Automações
          </InternalMenu.Button>
        </InternalMenu.Root>
      </Stack>
    </div>
  );
}
