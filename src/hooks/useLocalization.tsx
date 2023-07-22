import { useContext } from "react";
import { LocalizationContext } from "@contexts/LocalizationContext";

export function useLocalization() {
  return useContext(LocalizationContext);
}
