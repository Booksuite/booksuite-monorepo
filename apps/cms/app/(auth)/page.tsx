import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      <h1>Olá, {session?.user?.name}</h1>

      <Button as={Link} href={"/nova-empresa"}>
        Adicionar Empresa
      </Button>
    </main>
  );
}
