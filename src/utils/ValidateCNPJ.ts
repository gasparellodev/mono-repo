export class ValidateCNPJ {
  public handle(CNPJ: string): boolean {
    if (
      CNPJ === "00000000000000" ||
      CNPJ === "11111111111111" ||
      CNPJ === "22222222222222" ||
      CNPJ === "33333333333333" ||
      CNPJ === "44444444444444" ||
      CNPJ === "55555555555555" ||
      CNPJ === "66666666666666" ||
      CNPJ === "77777777777777" ||
      CNPJ === "88888888888888" ||
      CNPJ === "99999999999999" ||
      CNPJ.length !== 14
    ) {
      return false;
    }

    let dig13: string, dig14: string;
    let sm: number, i: number, r: number, num: number, peso: number;

    try {
      // Calculo do 1o. Digito Verificador
      sm = 0;
      peso = 2;
      for (i = 11; i >= 0; i--) {
        num = parseInt(CNPJ.charAt(i));
        sm += num * peso;
        peso += 1;
        if (peso === 10) {
          peso = 2;
        }
      }

      r = sm % 11;
      if (r === 0 || r === 1) {
        dig13 = "0";
      } else {
        dig13 = String.fromCharCode(11 - r + 48);
      }

      // Calculo do 2o. Digito Verificador
      sm = 0;
      peso = 2;
      for (i = 12; i >= 0; i--) {
        num = parseInt(CNPJ.charAt(i));
        sm += num * peso;
        peso += 1;
        if (peso === 10) {
          peso = 2;
        }
      }

      r = sm % 11;
      if (r === 0 || r === 1) {
        dig14 = "0";
      } else {
        dig14 = String.fromCharCode(11 - r + 48);
      }

      // Verifica se os dígitos calculados conferem com os dígitos informados.
      return dig13 === CNPJ.charAt(12) && dig14 === CNPJ.charAt(13);
    } catch (error) {
      return false;
    }
  }
}
