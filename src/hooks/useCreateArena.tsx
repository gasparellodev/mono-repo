import { useContext } from "react";
import { CreateArenaContext } from "@contexts/CreateArenaContext";

export function useCreateArena() {
  return useContext(CreateArenaContext);
}
