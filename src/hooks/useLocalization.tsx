import { useContext } from "react";
import { LocalizationContext } from "@contexts/LocalizationContext";

export function useLocalization() {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error(
      "useLocalization must be used within an LocalizationContext"
    );
  }

  return context;
}
