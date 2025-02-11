import React from "react";

import { Button, SimpleGrid } from "@chakra-ui/react";
import InputBox from "@/components/shared/form/InputBox";

export function PromoSection() {
  return (
    <section className="PromoSection bg-white py-20">
      <div className="container">
        <SimpleGrid columns={2}>
          <div>
            <h2>Receba nossas promoções</h2>

            <p>
              Cadastre-se agora e receba em primeira mão todas as novidades,
              ofertas e lançamentos.
            </p>
          </div>

          <div>
            <InputBox label="Insira seu e-mail" type="email" />

            <Button className="w-full mt-4">Cadastrar</Button>
          </div>
        </SimpleGrid>
      </div>
    </section>
  );
}
