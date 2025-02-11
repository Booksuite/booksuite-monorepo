"use client";

import { useRef } from "react";

import MinusIcon from "@/components/svgs/icons/MinusIcon";
import PlusIcon from "@/components/svgs/icons/PlusIcon";
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

export interface InputNumberBoxProps extends NumberInputProps {
  label?: string | React.ReactNode;
  labelProps?: FormLabelProps;
  variant?: "number" | "numberOutline";
}

export default function InputNumberBox({
  variant = "number",
  labelProps,
  ...props
}: InputNumberBoxProps) {
  const inputRef = useRef<any>(null);

  return (
    <FormControl
      className={`InputNumberBox InputNumberBox--${variant} ${props.className}`}
      variant={variant}
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <FormLabel {...labelProps}>{props.label ?? " "}</FormLabel>

      <NumberInput defaultValue={props.defaultValue ?? 0} min={props.min ?? 0} {...props}>
        <NumberInputField ref={inputRef} />
        <NumberInputStepper
          className="InputNumberBox__stepper"
          width={"100px"}
          flexDirection={"row"}
          gap={"30px"}
        >
          <NumberDecrementStepper className="InputNumberBox__actionButton">
            <MinusIcon color="var(--clr-primary)" />
          </NumberDecrementStepper>
          <NumberIncrementStepper className="InputNumberBox__actionButton">
            <PlusIcon color="var(--clr-primary)" />
          </NumberIncrementStepper>
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}
