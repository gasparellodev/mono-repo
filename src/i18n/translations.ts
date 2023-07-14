export type TranslationsType = {
  [lang: string]: {
    [key: string]: string;
  };
};

export const translations: TranslationsType = {
  pt: {
    INVALID_CREDENTIALS: "Usuário ou senha inválidos",
    INVALID_EMAIL: "E-mail inválido",
    PLEASE_CONFIRM_YOUR_EMAIL: "Por favor confirme seu e-mail",
    OWNER_MUST_BE_ARENA_TYPE:
      "O propietário deve estar registrado como tipo Arena",
    CNPJ_ALREADY_EXISTS: "CNPJ já cadastrado",
  },
};
