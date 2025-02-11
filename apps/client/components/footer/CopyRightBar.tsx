import React from "react";

import { Flex } from "@chakra-ui/react";
import LogoBooksuite from "../svgs/LogoBooksuite";

export function CopyRightBar() {
  return (
    <Flex
      className="pt-[3.125rem] mt-[3.125rem] border-t border-[rgba(255,255,255,0.3)] text-[0.8125rem]"
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <p className="m-0">
        © 2024 Chalé Lagoa da Serra®. Todos os direitos reservados.
      </p>

      <p className="flex items-center gap-4 m-0">
        Desenvolvido por: <LogoBooksuite />
      </p>
    </Flex>
  );
}
