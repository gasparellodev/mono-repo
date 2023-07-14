import { useContext } from "react";
import { CreateUserContext } from "@contexts/CreateUserContext";

export function useCreateUser() {
  return useContext(CreateUserContext);
}
