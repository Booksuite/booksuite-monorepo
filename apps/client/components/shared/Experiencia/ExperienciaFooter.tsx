import React, { HTMLProps } from "react";

import Button from "@/components/buttons/Button";
import { Flex, Grid, GridItem, SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import { Icons } from "@/components/svgs/icons";

interface ExperienciaFooterProps extends SimpleGridProps {}

export function ExperienciaFooter(props: ExperienciaFooterProps) {
  return (
    <Grid
      gridTemplateColumns={"1fr 110px"}
      {...props}
      className={`Experiencia__footer ${props.className}`}
    >
      <GridItem>
        <div>
          <p className="text-[0.9375rem] mb-0">
            <s>R$ 3.200,00</s>
            <span className="clr-green inline-block ml-[5px]">-10%</span>
          </p>
          <p>
            <b className="text-lg">R$ 2.880,00</b>
            <br />
            <small>Por unidade</small>
          </p>
        </div>
      </GridItem>

      <GridItem>
        <Flex w={"100%"} h={"100%"} alignItems={"end"} justifyContent={"end"}>
          <Button className="ml-auto font-normal" marginTop={"auto"} size={"sm"} leftIcon={<>+</>}>
            Adicionar
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
}
