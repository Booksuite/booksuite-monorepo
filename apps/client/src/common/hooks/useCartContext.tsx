import { CartContext } from "../contexts/cartContext";
import { useContext } from "react";

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }

  return context;
}
