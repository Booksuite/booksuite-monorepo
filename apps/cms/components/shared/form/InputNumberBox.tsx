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
} from "@chakra-ui/react";

export interface InputNumberBoxProps extends NumberInputProps {
  label?: string | React.ReactNode;
}

export default function InputNumberBox({ ...props }: InputNumberBoxProps) {
  const inputRef = useRef(null);

  return (
    <FormControl
      className={`InputNumberBox ${props.className}`}
      variant="number"
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <FormLabel>{props.label ?? " "}</FormLabel>

      <NumberInput
        defaultValue={props.defaultValue ?? 0}
        min={props.min ?? 0}
        {...props}
      >
        <NumberInputField ref={inputRef} />
        <NumberInputStepper
          className="InputNumberBox__stepper"
          width={"100px"}
          flexDirection={"row"}
          gap={"30px"}
        >
          <NumberDecrementStepper className="InputNumberBox__actionButton">
            <MinusIcon />
          </NumberDecrementStepper>
          <NumberIncrementStepper className="InputNumberBox__actionButton">
            <PlusIcon />
          </NumberIncrementStepper>
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}
