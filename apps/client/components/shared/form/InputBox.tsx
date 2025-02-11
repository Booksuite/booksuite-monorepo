"use client";

import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  FormControlProps,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";

interface InputBoxProps extends InputProps {
  asText?: boolean;
  formControl?: FormControlProps;
  label?: string;
  mask?: string;
}

function InputBox({ asText = false, ...props }: InputBoxProps) {
  const [inputHiddenValue, setInputHiddenValue] = useState(
    props.defaultValue ?? undefined
  );

  return (
    <FormControl
      {...props.formControl}
      className={`InputBox ${props.formControl?.className}`}
    >
      {props.type === "currency" ? (
        <>
          {asText === false && (
            <input type="hidden" name={props.name} value={inputHiddenValue} />
          )}
          <Input
            as={CurrencyInput}
            prefix={props.prefix ?? "R$ "}
            placeholder=" "
            decimalsLimit={2}
            decimalScale={2}
            onValueChange={(value: any, name: any, values: any) =>
              setInputHiddenValue(values.float)
            }
            {...props}
            name={asText ? props.name : ""}
          />
        </>
      ) : (
        <Input
          as={props?.mask ? InputMask : Input}
          type={props.type ?? "text"}
          placeholder=" "
          {...props}
        />
      )}
      <FormLabel>{props.label}</FormLabel>
    </FormControl>
  );
}

export default InputBox;
