"use client";

import { useRef } from "react";

import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  type FormLabelProps,
} from "@chakra-ui/react";

export interface InputAmountNumberBoxProps extends NumberInputProps {
  label?: string | React.ReactNode;
  labelProps?: FormLabelProps;
  variant?: "number" | "numberOutline";
}

export default function InputAmountNumberBox({
  variant = "number",
  ...props
}: InputAmountNumberBoxProps) {
  const inputRef = useRef<any>(null);

  return (
    <FormControl
      className={`InputAmountNumberBox InputAmountNumberBox--${variant} ${props.className}`}
      variant={variant}
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <FormLabel {...props.labelProps}>{props.label ?? " "}</FormLabel>

      <NumberInput defaultValue={props.defaultValue ?? 1} maxW={90} min={props.min ?? 1} {...props}>
        <NumberInputField ref={inputRef} />
        <NumberInputStepper
          className="InputAmountNumberBox__stepper"
          width={"90px"}
          flexDirection={"row"}
          gap={"30px"}
        >
          <NumberDecrementStepper className="InputAmountNumberBox__actionButton InputAmountNumberBox__actionButton--left">
            -
          </NumberDecrementStepper>
          <NumberIncrementStepper className="InputAmountNumberBox__actionButton InputAmountNumberBox__actionButton--right">
            +
          </NumberIncrementStepper>
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}
