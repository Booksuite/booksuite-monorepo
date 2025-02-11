"use client";

import React from "react";

import {
  Accordion,
  ChakraProvider,
  defineStyle,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react";

interface ChakraThemeProviderProps {
  children: React.ReactNode;
}

export default function ChakraThemeProvider({ children }: ChakraThemeProviderProps) {
  const naked = defineStyle({
    color: "primary.900",
    borderColor: "primary.900",
    borderWidth: 0,
    height: "auto",
    padding: 0,
    _hover: {
      color: "primary.600",
      backgroundColor: "inherit",
      _disabled: {
        color: "#a1a1aa",
      },
    },
    _active: {
      color: "primary.800",
      backgroundColor: "inherit",
    },
    _disabled: {
      color: "#a1a1aa",
    },
  });
  const outline = defineStyle({
    color: "primary.900",
    borderColor: "primary.900",
    _hover: {
      color: "primary.600",
      backgroundColor: "inherit",
      _disabled: {
        color: "#a1a1aa",
      },
    },
    _active: {
      color: "primary.800",
      backgroundColor: "inherit",
    },
    _disabled: {
      color: "#a1a1aa",
    },
  });
  const primary = defineStyle({
    background: "primary.500",
    color: "white",
    _hover: {
      background: "primary.400",
      _disabled: {
        background: "#F1F1F1",
        color: "#a1a1aa",
      },
    },
    _active: {
      background: "primary.700",
    },
    _disabled: {
      background: "#F1F1F1",
      color: "#a1a1aa",
    },
  });
  const secondary = defineStyle({
    background: "secondary.500",
    color: "white",
    _hover: {
      background: "secondary.400",
      _disabled: {
        background: "#F1F1F1",
        color: "#a1a1aa",
      },
    },
    _active: {
      background: "secondary.700",
    },
    _disabled: {
      background: "#F1F1F1",
      color: "#a1a1aa",
    },
  });

  const buttonTheme = defineStyleConfig({
    baseStyle: {
      fontWeight: "600",
      fontSize: "0.875rem",
    },
    variants: {
      outline,
      secondary,
      primary,
      naked,
    },
    defaultProps: {
      size: "lg",
      variant: "primary",
    },
  });

  const linkPrimary = defineStyle({
    color: "primary.400",
    fontWeight: "500",
  });

  const linkTheme = defineStyleConfig({
    variants: { primary: linkPrimary },
  });

  const SwitchTheme = defineStyleConfig({
    baseStyle: {
      container: {
        alignItens: "center",
      },
      thumb: {
        w: "1.25rem",
        h: "1.25rem",
        bg: "#a1a1aa",
        transform: "translateX(2px) translateY(2px)",
        _checked: {
          bg: "#fff",
          transform: "translateX(18px) translateY(2px)",
          _disabled: {
            bg: "#fff",
          },
        },
        _disabled: {
          bg: "#fff",
        },
      },
      track: {
        w: "2.5rem",
        h: "1.5rem",
        p: 0,
        bg: "tertiary.50",
        _checked: {
          bg: "primary.900",
          _disabled: {
            background: "#a1a1aa",
          },
        },
        _disabled: {
          background: "#a1a1aa",
        },
      },
    },
  });

  const checkBoxTheme = defineStyleConfig({
    baseStyle: {
      control: {
        w: "1.5rem",
        h: "1.5rem",
        _checked: {
          bg: "primary.900",
          borderColor: "primary.900",

          _hover: {
            bg: "primary.700",
            borderColor: "primary.700",
          },
        },
        _focus: {
          boxShadow: "unset",
        },
      },
    },
  });

  const accordionTheme = defineStyleConfig({
    // define the part you're going to style
    baseStyle: {
      container: {
        p: "20px",
      },
      button: {
        _hover: {
          bg: "inherit",
        },
      },
      panel: {
        paddingBlock: "0",
      },
    },
  });

  const activeLabelStyles = {
    transform: "scale(0.75) translateY(-.7em)",
  };

  const theme = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    components: {
      Button: buttonTheme,
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles,
                },
              },
              ".chakra-input__group:has(input:not(:placeholder-shown)) + label, input:not(chakra-numberinput__field):not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
                {
                  ...activeLabelStyles,
                },
              label: {
                top: "1.05em",
                left: 0,
                zIndex: 2,
                position: "absolute",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 0,
                transformOrigin: "left top",
                color: "primary.900",
              },
              input: {
                h: "14",
                background: "#fff",
                color: "primary.900",
                pb: "0px",

                _disabled: {
                  background: "tertiary.50",
                },
              },
              textarea: {
                h: "168px",
                background: "#fff",
                color: "primary.900",
              },
            },
          },
          number: {
            container: {
              input: {
                h: "14",
                background: "#fff",
                color: "primary.900",
                pb: "0px",
              },
            },
          },
          numberOutline: {
            container: {
              border: 0,
              input: {
                h: "14",
                background: "#fff",
                color: "primary.900",
                pb: "0px",
              },
            },
          },
        },
        defaultProps: {
          variant: "floating",
        },
      },
      Link: linkTheme,
      Switch: SwitchTheme,
      Checkbox: checkBoxTheme,
      Accordion: accordionTheme,
    },
    colors: {
      // as cores são alteradas no arquivo \assets\styles\base\_variables.scss
      primary: {
        50: "#f7fafc",
        100: "#f7fafc",
        200: "#f7fafc",
        300: "#f7fafc",
        400: "#f7fafc",
        500: "#718096",
        600: "#f7fafc",
        700: "#f7fafc",
        800: "#f7fafc",
        900: "#171923",
      },
      secondary: {
        50: "#f7fafc",
        100: "#718096",
        200: "#171923",
        300: "#171923",
        400: "#171923",
        500: "#171923",
        600: "#171923",
        700: "#171923",
        800: "#171923",
        900: "#171923",
      },

      tertiary: {
        50: "#f7fafc",
        100: "#718096",
        200: "#171923",
        300: "#171923",
        400: "#171923",
        500: "#171923",
        600: "#171923",
        700: "#171923",
        800: "#171923",
        900: "#171923",
      },
    },
  });

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
