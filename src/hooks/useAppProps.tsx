import { useContext } from "react";
import { AppPropsContext } from "@contexts/AppPropsContext";

export function useAppProps() {
  return useContext(AppPropsContext);
}
