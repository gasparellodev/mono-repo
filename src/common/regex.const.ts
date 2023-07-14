/**
 * Expressão regular para validar senhas.
 *
 * A expressão regular verifica se a senha contém:
 * - Pelo menos um dígito ou um caractere especial
 * - Pelo menos uma letra maiúscula e uma letra minúscula
 * - Pode conter qualquer caractere imprimível.
 *
 * @constant {RegExp} PASSWORD_REGEX
 */
export const PASSWORD_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
