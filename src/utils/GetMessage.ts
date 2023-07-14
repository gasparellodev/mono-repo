import { translations } from "../i18n/translations";

export function getMessage(key: string, lang: string): string {
  // Verifica se a mensagem está em translations
  if (translations[lang][key]) {
    return translations[lang][key];
  }

  // Caso contrário, retorna a própria mensagem
  return key;
}
