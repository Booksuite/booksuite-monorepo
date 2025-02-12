"use client";

import { useClient } from "@/src/hooks/useClient";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

export default function SelectBox({ ...props }) {
  const { isClient } = useClient();

  return (
    <>
      {isClient ? (
        <FormControl className={props.className}>
          <Select
            className={`chakra-react-select`}
            classNamePrefix="chakra-react-select"
            selectedOptionColorScheme="primary"
            noOptionsMessage={() => "Nenhuma opção encontrada."}
            {...props}
          ></Select>
          <FormLabel>{props.label}</FormLabel>
        </FormControl>
      ) : (
        <FormControl>
          <Input />
          <FormLabel>{props.label}</FormLabel>
        </FormControl>
      )}
    </>
  );
}
