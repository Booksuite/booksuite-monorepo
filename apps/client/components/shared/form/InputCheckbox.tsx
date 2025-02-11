import React from "react";

import { Checkbox, CheckboxProps } from "@chakra-ui/react";

interface Props extends CheckboxProps {
  variant?: "labelFirst";
  children?: React.ReactNode;
}

function InputCheckboxBox(props: Props) {
  const variantClassesMapper = new Map();

  variantClassesMapper.set(
    "labelFirst",
    "flex flex-row-reverse justify-between"
  );

  return (
    <Checkbox
      {...props}
      className={`InputCheckbox InputCheckbox--${
        props.variant
      } ${variantClassesMapper.get(props.variant)} ${props.className}`}
    >
      {props.children}
    </Checkbox>
  );
}

export default InputCheckboxBox;
