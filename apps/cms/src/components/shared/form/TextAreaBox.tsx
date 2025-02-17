"use client";

import { FormControl, FormLabel, Textarea, TextareaProps } from "@chakra-ui/react";
import React, { useState } from "react";

interface TextAreaBoxProps extends TextareaProps {
  label?: string;
}

export function TextAreaBox({ ...props }: TextAreaBoxProps) {
  const [charCount, setCharCount] = useState(props.defaultValue?.toString().length ?? 0);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCharCount(e.target.value.length);

    if (props.onChange) {
      props.onChange(e);
    }
  }

  return (
    <FormControl className={`TextAreaBox ${props.className}`}>
      <Textarea placeholder=" " {...props} onChange={handleChange} />
      <FormLabel>{props.label}</FormLabel>

      {props.maxLength && (
        <div className="TextAreaBox__counter">
          {charCount}/{props.maxLength}
        </div>
      )}
    </FormControl>
  );
}
